import { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import useDimension from "pages/download_pdf/hooks/useDimension";

export default function BarChart({barChartData}:any) {
  const {isWidthSmall} = useDimension()

  useLayoutEffect(() => {
    var root = am5.Root.new("chartdiv2");

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    var chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
      })
    );

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
    xRenderer.labels.template.setAll({
      rotation: -90,
      centerY: am5.p50,
      centerX: am5.p100,
      paddingRight: 15,
    });

    var xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0.3,
        categoryField: "workfor",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    

    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    yAxis.get("renderer").labels.template.setAll({
      oversizedBehavior: "truncate",
      maxWidth: 20
    });
    

    // Create series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    var series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Series 1",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        sequencedInterpolation: true,
        categoryXField: "workfor",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
        }),
      })
    );

    series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5 });
    series.columns.template.adapters.add(
      "fill",
      function (fill: any, target: any) {
        //@ts-ignore
        return chart.get("colors").getIndex(series.columns.indexOf(target));
      }
    );

    series.columns.template.adapters.add(
      "stroke",
      function (stroke: any, target: any) {
        //@ts-ignore
        return chart.get("colors").getIndex(series.columns.indexOf(target));
      }
    );

    const barData = Object.keys(barChartData)?.map(i=>{
        return ({workfor:i,value:barChartData[i]})
    })

    // Set data
    

    xAxis.data.setAll(barData);
    series.data.setAll(barData);

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);
    if(isWidthSmall) xAxis.hide()
    return () => root.dispose();
  }, [barChartData]);

  return (
    <>
      <div id="chartdiv2" style={isWidthSmall ? {width:"80%",height:"300px"} : { width: "100%", height: "1000px" }} />
    </>
  );
}
