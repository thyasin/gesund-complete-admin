import { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { countryID } from "pages/download_pdf/country";
import "./style.scss"

export default function GeoMapChart({ chartId,data }: any) {

  useLayoutEffect(() => {
    var root = am5.Root.new(chartId);

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    var chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "translateX",
        panY: "translateY",
        projection: am5map.geoNaturalEarth1(),
        
  // rotationX: -154.8
      })
    );

    // Create polygon series
    var polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        valueField: "value",
        exclude: ["AQ"],
        calculateAggregates: true,
        fill:am5.color("#fff")
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}: {value}",
    });

    polygonSeries.set("heatRules", [
      {
        target: polygonSeries.mapPolygons.template,
        dataField: "value",
        min: am5.color("#C1C1C1"),
        max: am5.color("#868686"),
        key: "fill",
      },
    ]);

    
    const GeoData = Object.keys(data)?.map((i: any) => {
      return {
        id: (countryID as any)[i],
        value: data[i],
      }
    });

    polygonSeries.data.setAll(GeoData);

    return () => root.dispose();
    
  }, [chartId,data]);

  return <div id={chartId} className="geoMapChart"/>;
}
