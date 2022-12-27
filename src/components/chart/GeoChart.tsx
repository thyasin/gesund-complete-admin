import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useLayoutEffect } from "react";
import { countryID } from "pages/download_pdf/country";
import useDimension from "pages/download_pdf/hooks/useDimension";


export default function GeoChart({data}:any) {

 const {isWidthSmall} = useDimension()
  useLayoutEffect(() => {
    var root = am5.Root.new("chartdiv");

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    // Create the map chart
    // https://www.amcharts.com/docs/v5/charts/map-chart/
    var chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "rotateX",
        panY: "rotateY",
        projection: am5map.geoMercator(),
      })
    );

    // Create series for background fill
    // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
    var backgroundSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {})
    );
    backgroundSeries.mapPolygons.template.setAll({
      fill: root.interfaceColors.get("alternativeBackground"),
      fillOpacity: 0,
      strokeOpacity: 0,
    });
    // Add background polygo
    // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
    backgroundSeries.data.push({
      geometry: am5map.getGeoRectangle(90, 180, -90, -180),
    });

    // Create main polygon series for countries
    // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
    var polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      fill: root.interfaceColors.get("alternativeBackground"),
      fillOpacity: 0.15,
      strokeWidth: 0.5,
      stroke: root.interfaceColors.get("background"),
    });

    // Create polygon series for circles
    // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
    const circleTemplate = am5.Template.new({
      //@ts-ignore
      tooltipText: "{name}: {value}",
    });

    const bubbleSeries = chart.series.push(
      am5map.MapPointSeries.new(root, {
        calculateAggregates: true,
        valueField: "value",
        polygonIdField: "id",
      })
    );

    bubbleSeries.bullets.push(function () {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(
          root,
          {
            radius: 10,
            templateField: "circleTemplate",
        },
        //@ts-ignore
        circleTemplate
        ),
      });
    });

    bubbleSeries.set("heatRules", [
      {
        target: circleTemplate,
        min: 4,
        max: 12,
        key: "radius",
        dataField: "value",
      },
    ]);

    var colors = am5.ColorSet.new(root, {});

    const GeoData = Object.keys(data)?.map((i: any) => {
      return {
        id: (countryID as any)[i],
        value: data[i],
        name: i,
        circleTemplate: {
          fill: colors.getIndex(
            Math.floor(Math.random() * [0, 1, 2, 3, 4, 5, 6, 7, 8].length)
          ),
        },
      };
    });

    bubbleSeries.data.setAll(GeoData);

    // Add globe/map switch
    var cont = chart.children.push(
      am5.Container.new(root, {
        layout: root.horizontalLayout,
        x: 20,
        y: 40,
      })
    );

    // cont.children.push(
    //   am5.Label.new(root, {
    //     centerY: 35,
    //     centerX: 0,
    //     text: "Map",
    //   })
    // );

    var switchButton = cont.children.push(
      am5.Button.new(root, {
        themeTags: ["switch"],
        cursorOverStyle:"pointer",
        draggable:true,
        centerY: 35,
        marginLeft: -10,
        icon: am5.Circle.new(root, {
          themeTags: ["icon"],
        }),
      })
    );

    switchButton.on("active", function () {
      if (!switchButton.get("active")) {
        chart.set("projection", am5map.geoMercator());
        backgroundSeries.mapPolygons.template.set("fillOpacity", 0);
      } else {
        chart.set("projection", am5map.geoOrthographic());
        backgroundSeries.mapPolygons.template.set("fillOpacity", 0.1);
      }
    });

    // cont.children.push(
    //   am5.Label.new(root, {
    //     centerY: 35,
    //     text: "Globe",
    //   })
    // );

    // Make stuff animate on load
    chart.appear(1000, 100);

    return () => root.dispose();
  }, [data]);
  return (
    <>
      <div id="chartdiv" style={isWidthSmall ? {width: "80%", height: "400px"} : { width: "100%", height: "750px" }} />
    </>
  );
}
