import React, { useLayoutEffect } from 'react'
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Dark from "@amcharts/amcharts5/themes/Dark"
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import "./style.scss"

export default function SemiCircleChart({chartId,data,totalDownload,isWidthSmall}:{chartId:string,data:any,totalDownload:number,isWidthSmall:boolean}) {

  useLayoutEffect(()=>{
    
        const colorPalette = ["#ACB9FF", "#503795", "#FFECC1", "#FFCC59", "#DFAB36", "#19B6A4", "#AEF5F5", "#2CD7C4", "#FEDF9A", "#C2E9FF", "#7299FF", "#4067CD", "#E289F2", "#855CF8"];
        
            // Create root element
            // https://www.amcharts.com/docs/v5/getting-started/#Root_element
            var root = am5.Root.new(chartId);
            
            let colorTheme = am5themes_Dark.new(root)
            
            colorTheme.rule("ColorSet").set("colors",colorPalette.map(color => am5.color(color)))
            // Set themes
            // https://www.amcharts.com/docs/v5/concepts/themes/
            root.setThemes([
                am5themes_Animated.new(root),colorTheme
            ]);
            
            // Create chart
            // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
            // start and end angle must be set both for chart and series
            var chart = root.container.children.push(am5percent.PieChart.new(root, {
              startAngle: 180,
              endAngle: 360,
              layout: isWidthSmall ? root.verticalLayout : root.horizontalLayout,
              innerRadius: am5.percent(50),
              centerY: isWidthSmall ? am5.percent(10) : 0,
              x:isWidthSmall ? am5.percent(0) : am5.percent(-5),
              
            }));
            
            // Create series
            // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
            // start and end angle must be set both for chart and series
            var series = chart.series.push(am5percent.PieSeries.new(root, {
              startAngle: 180,
              endAngle: 360,
              valueField: "value",
              legendValueText: "{value}",
              categoryField: "category",
              alignLabels: false,

            }));
            
            series.states.create("hidden", {
              startAngle: 180,
              endAngle: 180
            });
            
            series.slices.template.setAll({
              cornerRadius: 5
            });
            
            series.ticks.template.setAll({
              forceHidden: true
            });

            const pieData = Object.keys(data).map(i=>{return {value:data[i], category: i}}).filter(i=>i.value !== 0)
            
            // Set data
            // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
            series.data.setAll(pieData);
            series.ticks.template.setAll({forceHidden:true})
            series.labels.template.setAll({visible:false,text:""});
            
            series.slices.template.set("tooltipText", "{category}: {value}");
            series.children.push(am5.Label.new(root, {
                text: `Total : ${totalDownload}`,
                fontSize: 20,
                centerX: am5.percent(50),
                centerY: am5.percent(80),
              }));
     

              var legend = chart.children.push(am5.Legend.new(root, {
                centerY: am5.percent(50),
                y: isWidthSmall ? am5.percent(80) : am5.percent(55),
                centerX:am5.percent(90),
                x:isWidthSmall ? am5.percent(85) : am5.percent(95),
                layout: root.verticalLayout,
                height:isWidthSmall ? 150 : 250,
                width:isWidthSmall ? 280 : 275,
                verticalScrollbar: am5.Scrollbar.new(root, {
                    orientation: "vertical"
                }),
              }));
              // set value labels align to right
              legend.valueLabels.template.setAll({ textAlign: "right"})
              // set width and max width of labels
              legend.labels.template.setAll({ 
                maxWidth: 140,
                width: 140,
                oversizedBehavior: "wrap",
              });
              legend.data.setAll(series.dataItems);
            series.appear(1000, 100);
            return () => root.dispose();
            
    },[chartId,data])
  return (

        <div id={chartId} className="semiCircleChart"/>

  )
}
