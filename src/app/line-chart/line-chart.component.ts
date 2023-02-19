import { FixedSizeVirtualScrollStrategy } from "@angular/cdk/scrolling";
import {
  Component,
  Input,
  OnInit
} from "@angular/core";
import * as highcharts from "highcharts";
@Component({
  selector: "app-line-chart",
  templateUrl: "./line-chart.component.html",
  styleUrls: ["./line-chart.component.scss"],
})
export class LineChartComponent implements OnInit {
  defaultData = {categories:["Jan","Feb","Mar","apr","may","jun","jul","aug"],series:[{
    name:"column",
    showInLegend:false,
    type:"column",
    data:[20,30,40,35,25,90,12,45]
  }]}
  @Input('data')
  set in(val:any){
    console.log(val)
    if(val){
      this.linechart(val)
    }
    else{
      this.linechart(this.defaultData)
    }
   
  }

  highcharts = highcharts;
  lineChartOptions = {};
  shouldUpdateChanges = true;
  constructor() {}

  ngOnInit() {
    // this.linechart(this.defaultData);
    // const time = {
    //   useUTC:FixedSizeVirtualScrollStrategy
    //   };
      
    //   highcharts.setOptions(time);
  }
  linechart(data:any) {
    console.log(data)
    return (this.lineChartOptions = {
      chart: {
        type:'column',
        width:"100%",
        events: data.livedata? data.livedata : null,
        backgroundColor: "transparent",
        padding: "10px",
        zoomType: 'x',
        panning: true,
        reflow:true,
        panKey: 'shift',
        marginBottom:30,
        marginTop:10,
        marginRight:20,
        // spacing:[0,0,0,0],
        style:{fontFamily: 'sfpro-r'},
      },
      time:{useUTC:false},
      credits:{
        enabled:false,
        style:{
        color:'#999999',
        cursor:'pointer',
        fontSize:'9px',
        },
        text:'Highcharts.com'
        },
      title: {
        text: "",
        align: "left",
        useHTML: false,
        style: {
          color: '#595959',
          fontSize: "16px",
        },
      },
      subtitle: {
        text: "",
      },
      yAxis: {
        min:data.y_min?data.y_min:null,
        max:data.y_max?data.y_max:null,
        gridLineColor: "#F6F8FA",
        lineWidth: 0,
        plotLines:data.plotLines?data.plotLines:null,
        lineColor:"gray",
        endOnTick: true,
        title: {
          text: `${data.y_title}`,
          enabled:true,
          style: {
             color: '#595959',
            fontSize:14
          },
        },
        labels: {
          style: {
             color: '#595959',
            fontSize:12
          },
          // formatter: function() {
          //   return this.value + ' %'
          // }
        },
      },
      accessibility:data.accessibility? data.accessibility:null,
      xAxis: {
        title: {
          text: data.x_title? data.x_title:"",
          enabled:true,
          style: {
          color: ['#595959','#CD5C5C'],
          fontSize:14,
          },
          y:-20
          },
        type: data.xAxisFormat?data.xAxisFormat:null,
          lineColor:"gray",
          lineWidth:1,
        labels: {
          style: {
             color: '#595959',
            fontSize:12
          },
          step:1,
          formatter: data.labelFormatter?data.labelFormatter:null
        },
        categories: data.categories? data.categories:null,
        gridLineColor: "#F6F8FA",
        gridLineWidth: 1,
        // alternateGridColor: '#D9E2F2',
      },
    legend: {
      layout: 'vertical',
      align: 'center',
      verticalAlign: 'top',
      itemMarginTop: -25,
      itemMarginBottom: 40,
      squareSymbol: true,
      symbolHeight: 10,
      symbolWidth: 10,
      symbolRadius: 0,
      itemStyle: {
         color: 'var(--graph-text-color)',
        fontWeight: "ligther",
        fontSize: 13,
      },
      y:10,
    },
      plotOptions: {
        line:{
          marker:{
            enabled:false
          }
          // threshold: data.threshold? data.threshold : 0,
        },
        series: {
          turboThreshold:4000,
          label: {
            connectorAllowed: true,
          },
          color:["#eeeeee"],
        },
      },
      tooltip: {
        time:{
          useUTC:false
        },
        xDateFormat: '%d-%m-%y, %H:%M:%S',
        headerFormat:
        // '<span style="font-size:14px; font-weight:light">{series.name}<br/> </span>' +
        "<span style='font-size:14px;'>on {point.key}</span><table>",
        pointFormat:
          '<tr style="font-size:14px;"><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><span>{point.y:.2f} ' +
          data?.unit +
          "</span></td></tr>",
        footerFormat: "</table>",
        shared: true,
        useHTML: true,
        backgroundColor:"blue",
        borderColor:"#eeeeee"
      },
      series:data.series
    });
  }
}
