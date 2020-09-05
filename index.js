// csv data: https://data.giss.nasa.gov/gistemp/
const fetchCSV = async (filename) => {
  const xAxis = [];
  const yAxis = [];
  const response = await fetch(filename.trim());
  const data = await response.text();

  const tableData = data.split("\n").splice(1);
  tableData.forEach((row) => {
    const cols = row.split(",");
    const year = cols[0];
    xAxis.push(year);

    const temp = cols[1];
    yAxis.push(parseFloat(temp) + 14);
  });
  return {
    xAxis,
    yAxis,
  };
};

const createChart = async (fileOne, fileTwo, fileThree) => {
  const dataOne = await fetchCSV(fileOne);
  const dataTwo = await fetchCSV(fileTwo);
  const dataThree = await fetchCSV(fileThree);

  var ctx = document.getElementById("myChart").getContext("2d");
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: "line",

    // The data for our dataset
    data: {
      labels: dataOne.xAxis,
      datasets: [
        {
          label: "Zonal Annual Means (Temperature in °)",
          fill: false,
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: dataOne.yAxis,
        },
        {
          label:
            "Global-mean Monthly, Seasonal, and Annual Means (Temperature in °)",
          fill: false,
          backgroundColor: "rgb(255, 99, 255)",
          borderColor: "rgb(255, 99, 255)",
          data: dataTwo.yAxis,
        },
        {
          label:
            "Northern Hemisphere-mean monthly, seasonal, and annual means (Temperature in °)",
          fill: false,
          backgroundColor: "rgb(255, 255, 255)",
          borderColor: "rgb(180, 80, 255)",
          data: dataThree.yAxis,
        },
      ],
    },

    // Configuration options go here
    options: {},
  });
};

createChart("data.csv", "data-two.csv", "data-three.csv");
