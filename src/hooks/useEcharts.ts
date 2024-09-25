import * as echarts from 'echarts';

export function useEcharts() {

  let chartInstance:any = null
  // 调用时传进来一个响应式 DOM标签
  const initEcharts = (domElement:any) => {
    chartInstance = echarts.init(domElement);
    return chartInstance;
  };

  // 定义好数据格式直接传进来即可
  const setOptions = (options:any) => {
    if (chartInstance) {
      chartInstance.setOption(options);
    }
  };

  // 四、更新图表数据
  const updateData = (newData:any) => {
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
    initEcharts,
    setOptions,
    updateData,
    unmountChart,
  };
}