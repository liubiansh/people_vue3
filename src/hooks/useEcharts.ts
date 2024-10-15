import * as echarts from 'echarts';
export function useEcharts() {
  let chartInstance: any = null
  // svg矢量图
  const initSEcharts = (domElement: any) => {
    chartInstance = echarts.init(domElement, null, {
      renderer: 'svg'
    });
    return chartInstance;
  };
  // canvas图
  const initCEcharts = (domElement: any) => {
    chartInstance = echarts.init(domElement);
    return chartInstance;
  };
  // 基础配置项
  const commonBarOptions = {
    textStyle: {
      color: '#333'
    },
    grid: {
      top: '25%'
    },
    width: "80%",
    height: '53%',
    xAxis: {
      type: 'category',
      axisLabel: { interval: 0 }
    }
  };
  // 基础柱状图
  const setBasicBar = (chartInstance: any, sourceArray: string[][], titleText: string, subtext?: string,) => {
    const options = {
      ...commonBarOptions,
      title: {
        text: titleText || '',
        subtext: subtext || '',
        subtextStyle: {
          align: 'right'
        },
        left: 'center'
      },
      dataset: [
        {
          dimensions: ['name', 'score'],
          source: sourceArray
        },
        {
          transform: {
            type: 'sort',
            config: { dimension: 'score', order: 'desc' }
          }
        }
      ],
      yAxis: {
        axisLabel: {
          formatter: function (value: number) {
            return value + '%';
          }
        }
      },
      series: {
        type: 'bar',
        encode: { x: 'name', y: 'score' },
        datasetIndex: 1,
        label: {
          show: true,
          position: 'top',
          color: '#666',
          formatter: function (value: any) {
            return value.data[1] + '%';
          }
        }
      }
    };
    if (chartInstance) {
      chartInstance.setOption(options);
    }
  };
  // 数据集柱状图（可带折线图）
  const setSimDataset = (chartInstance: any, sourceArray: string[][], titleText: string, line?: boolean, unit?: string, subtext?: string) => {
    // 全局提示框配置项
    const tooltipOptions = line ? {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    } : {};
    // Y轴配置项
    const yAxisOptions = unit ? {
      axisLabel: {
        formatter: '{value}' + unit
      }
    } : {};
    // X轴配置项
    const xAxisOptions = line ? {
      type: 'category',
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: "#409eff22"
        }
      }
    } : {};
    // 系列提示框配置项
    const seriesToolTip = unit ? {
      valueFormatter: function (value: number) {
        return value + unit;
      }
    } : {}
    // 数据基础配置
    const label = {
      show: true,
      position: 'top',
      color: "#666",
      fontSize: 11,
    }
    // 柱状图配置项
    const seriesBar = {
      type: 'bar',
      label: unit ? {
        ...label,
        formatter: function (params: any) {
          return params.value[params.encode.y[0]] + unit 
        }
      } : label,
      tooltip: seriesToolTip,
    }
    // 折线图配置项
    const seriesLine = {
      type: 'line',
      label: unit ? {
        ...label,
        formatter: function (params: any) {
          return params.data[4] + unit
        }
      } : label,
      tooltip: seriesToolTip,
    }
    // 总系列设置
    const seriesOptions = line ? [seriesBar, seriesBar, seriesBar, seriesLine] : [seriesBar, seriesBar, seriesBar];
    // 总配置项
    const options = {
      ...commonBarOptions,
      // 标题，可选副标题
      title: {
        text: titleText,
        left: 'center',
        top: '2%',
        subtext: subtext,
        subtextStyle: {
          lineHeight: 16
        }
      },
      // 图形的位置
      grid: {
        top: "30%"
      },
      // 小图例在图形中的位置
      legend: {
        right: '1%',
        top: '2%',
        orient: 'vertical'
      },
      tooltip: tooltipOptions,
      dataset: {
        source: sourceArray
      },
      yAxis: yAxisOptions,
      xAxis: xAxisOptions,
      series: seriesOptions
    };
    if (chartInstance) {
      chartInstance.setOption(options);
    }
  }
  // 更新图表数据
  const updateData = (newData: any) => {
    if (chartInstance) {
      const options = chartInstance.getOption();
      options.series[0].data = newData;
      chartInstance.setOption(options);
    }
  };
  // 销毁图表
  const unmountChart = () => {
    if (chartInstance) {
      chartInstance.dispose();
      chartInstance = null
    }
  };
  return {
    initSEcharts,
    initCEcharts,
    setBasicBar,
    setSimDataset,
    updateData,
    unmountChart,
  };
}