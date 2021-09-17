import React, { useContext } from "react";
import Chart from "react-apexcharts";
import { RootContext } from "./../contexts/Context";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

class ProblemStats extends React.Component {
  state = {
    isLoading: true,
    activeTab: 0, // m/y
    dailyData: [],
    dailyTags: [],
    monthlyData: [],
    monthlyTags: [],
    problemId: -1,
    apexDataM: {
      series: [
        {
          name: "Accesări",
          type: "column",
          data: [],
          color: "#546BE5"
        },
        {
          name: "Vizualizări soluții",
          type: "column",
          data: [],
          color: "#181818"
        },
        {
          name: "Accesări totale",
          type: "area",
          data: [],
          color: "#1AE496"
        },
      ],
      options: {
        chart: {
          height: 350,
          toolbar: {
            show: false
          },
        },
        stroke: {
          colors: ["#546BE5", "#181818", "#1AE496"],
          width: [0, 0, 2],
          curve: 'smooth'
        }, 
        fill: {
          colors: ["#546BE5", "#181818", "#1AE496"],
          opacity: [0.8, 0.8, 0.25],
          gradient: {
            shade: 'light',
            type: "vertical",
            opacityFrom: 0.85,
            opacityTo: 0.55,
            stops: [0, 100, 100, 100]
          }
        },       
        yaxis: [
          {
            axisBorder: {
              show: true,
              color: '#546BE5'
            },
              labels: {
                style: {
                  colors: '#546BE5',
                }
            },
          },
          {
            axisBorder: {
              show: true,
              color: '#181818'
            },
              labels: {
                style: {
                  colors: '#181818',
                }
            },
          },
          {
            opposite: true,
            axisBorder: {
              show: true,
              color: '#1AE496'
            },
              labels: {
                style: {
                  colors: '#1AE496',
                }
            },
          },
        ],
        xaxis: {
          tickPlacement: 'between',
          categories: []
        }
      },
    },
    apexDataY: {
      series: [
        {
          name: "Accesări",
          type: "column",
          data: [],
          color: "#546BE5"
        },
        {
          name: "Vizualizări soluții",
          type: "column",
          data: [],
          color: "#181818"
        },
        {
          name: "Accesări totale",
          type: "area",
          data: [],
          color: "#1AE496"
        },
      ],
      options: {
        chart: {
          height: 350,
          toolbar: {
            show: false
          },
        },
        stroke: {
          colors: ["#546BE5", "#181818", "#1AE496"],
          width: [0, 0, 2],
          curve: 'smooth'
        }, 
        fill: {
          colors: ["#546BE5", "#181818", "#1AE496"],
          opacity: [0.8, 0.8, 0.25],
          gradient: {
            shade: 'light',
            type: "vertical",
            opacityFrom: 0.85,
            opacityTo: 0.55,
            stops: [0, 100, 100, 100]
          }
        },       
        yaxis: [
          {
            axisBorder: {
              show: true,
              color: '#546BE5'
            },
              labels: {
                style: {
                  colors: '#546BE5',
                }
            },
          },
          {
            axisBorder: {
              show: true,
              color: '#181818'
            },
              labels: {
                style: {
                  colors: '#181818',
                }
            },
          },
          {
            opposite: true,
            axisBorder: {
              show: true,
              color: '#1AE496'
            },
              labels: {
                style: {
                  colors: '#1AE496',
                }
            },
          },
        ],
        xaxis: {
          tickPlacement: 'between',
          categories: []
        }
      },
    },
  };

  componentDidMount() {
    this.context
      .API("/endpoint/module/problem-stats.php", {
        problem_id: this.state.problemId,
      })
      .then((result) => {
        this.setState({
          ...this.state,
          isLoading: false
        });
        if(result.errorMsg) {
          this.setState({
            ...this.state,
            errorMsg: result.errorMsg
          });
        } else {
          this.setState({
            ...this.state,
            apexDataM: {
              ...this.state.apexDataM,
              series: [
                {
                  name: "Accesări",
                  type: "column",
                  data: result.stats.daily.dAcc,
                },
                {
                  name: "Vizualizări soluții",
                  type: "column",
                  data: result.stats.daily.dSolViews
                },
                {
                  name: "Total accesări",
                  type: "area",
                  data: result.stats.daily.tAcc
                },
              ],
              options: {
                ...this.state.apexDataM.options,       
                xaxis: {
                  categories: result.stats.day_tags,
                  tickPlacement: 'between'
                },
              }
            },
            apexDataY: {
              ...this.state.apexDataY,
              series: [
                {
                  name: "Accesări",
                  type: "column",
                  data: result.stats.monthly.mAcc,
                },
                {
                  name: "Vizualizări soluții",
                  type: "column",
                  data: result.stats.monthly.mSolViews
                },
                {
                  name: "Total accesări",
                  type: "area",
                  data: result.stats.monthly.tAcc
                },
              ],
              options: {
                ...this.state.apexDataY.options,       
                xaxis: {
                  categories: result.stats.month_tags,
                  tickPlacement: 'between'
                },
              }
            }
          });
        }
      });
  }

  constructor(props) {

    super(props);
    this.state.problemId = props.problemId;

  }

  render() {

    const handleTabChange = (event, newTab) => {
      this.setState({
        ...this.state,      
        activeTab: newTab,
      })
    }

    return (
      <>
        {this.state.isLoading? <Box pt={2} pb={2}><center>Se încarcă...</center></Box> : <>
          {this.state.errorMsg? <Box pt={2}><center>this.state.errorMsg</center></Box> : <Box>            

          <Tabs
              value={this.state.activeTab}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleTabChange}
              
            >
              <Tab label="Ultima lună" key={0} id="tab--0"/>
              <Tab label="Ultimul an" key={1} id="tab--1"/>
            </Tabs>

            <div id={`_stats_chart_${this.state.problemId}`}>
              <Chart
                options={this.state.activeTab == 0? this.state.apexDataM.options : this.state.apexDataY.options}
                series={this.state.activeTab == 0? this.state.apexDataM.series : this.state.apexDataY.series}
                height={350}
              />
            </div>

            

          </Box>}
        </>}
      </>
    );

  }

}

ProblemStats.contextType = RootContext;

export default ProblemStats;
