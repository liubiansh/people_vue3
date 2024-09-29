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

  // 定义基础的数据
  const commonOptions = {
    textStyle: {
      color: '#333'
    },
    grid: {
      top: '28%'
    },
    width: 480,
    height: 100,
    xAxis: {
      type: 'category',
      axisLabel: { interval: 0 }
    }
  };
  // 定义好数据格式直接传进来即可
  const setBasicBar = (chartInstance: any, sourceArray: string[][], titleText: string, subtext?: string,) => {
    const options = {
      ...commonOptions,
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

  const setSimDataset = (chartInstance: any, sourceArray: string[][], bar: string[], titleText: string, subtext?: string,) => {
    const options = {
      ...commonOptions,
      title: {
        text: titleText,
        left: 'center'
      },
      legend: {
        right: 0, // 放在右侧
        orient: 'vertical' // 垂直布局
      },
      tooltip: {},
      dataset: {
        dimensions: ['product', ...bar],
        source: sourceArray
      },
      yAxis: {},
      series: [
        {
          type: 'bar',
          label: {
            show: true,
            position: 'top', // 可以设置为'top'、'bottom'、'left'、'right'、'center'等，表示标签的位置
            color: "#666",
            fontSize: 9
          }
        },
        {
          type: 'bar',
          label: {
            show: true,
            position: 'top', // 可以设置为'top'、'bottom'、'left'、'right'、'center'等，表示标签的位置
            color: "#666",
            fontSize: 9
          }
        },
        {
          type: 'bar',
          label: {
            show: true,
            position: 'top', // 可以设置为'top'、'bottom'、'left'、'right'、'center'等，表示标签的位置
            color: "#666",
            fontSize: 9
          }
        },
      ]
    };
    if (chartInstance) {
      chartInstance.setOption(options);
    }
  }

  // 四、更新图表数据
  const updateData = (newData: any) => {
    if (chartInstance) {
      const options = chartInstance.getOption();
      options.series[0].data = newData;
      chartInstance.setOption(options);
    }
  };

  // 五、销毁图表
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