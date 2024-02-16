document.getElementById('calculate_button').addEventListener('click', evaluate_for_three_eqn);
document.getElementById('calculate_button_two_eqn').addEventListener('click', evaluate_for_two_eqn);



function evaluate_for_three_eqn() {
    const x_values = document.querySelectorAll('.x_values');
    const y_values = document.querySelectorAll('.y_values');
    const z_values = document.querySelectorAll('.z_values');
    const c_values = document.querySelectorAll('.eqn_values_c');
    
    const isValidInput = Array.from(x_values).every(el => !isNaN(parseFloat(el.value)));
    if (!isValidInput) {
      alert("Invalid input. Please enter numerical values.");
      return;
    }
  
    let x = [];
    let y = [];
    let z = [];
    let c = [];
    
    for (let i = 0; i < x_values.length; i++) {
      x.push(parseFloat(x_values[i].value));
      y.push(parseFloat(y_values[i].value));
      z.push(parseFloat(z_values[i].value));
      c.push(parseFloat(c_values[i].value));
    }
  
    const D = x[0] * ((y[1] * z[2]) - (y[2] * z[1])) - y[0] * ((x[1] * z[2]) - (x[2] * z[1])) + z[0] * ((x[1] * y[2]) - (x[2] * y[1]));
  
    
    if (D === 0) {
      alert("The system of equations has no unique solution (Determinant D is zero).");
      return;
    }
  
    const x_res = (c[0] * ((y[1] * z[2]) - (y[2] * z[1])) - y[0] * ((c[1] * z[2]) - (c[2] * z[1])) + z[0] * ((c[1] * y[2]) - (c[2] * y[1]))) / D;
    const y_res = (x[0] * ((c[1] * z[2]) - (c[2] * z[1])) - c[0] * ((x[1] * z[2]) - (x[2] * z[1])) + z[0] * ((x[1] * c[2]) - (x[2] * c[1]))) / D;
    const z_res = (x[0] * ((y[1] * c[2]) - (y[2] * c[1])) - y[0] * ((x[1] * c[2]) - (x[2] * c[1])) + c[0] * ((x[1] * y[2]) - (x[2] * y[1]))) / D;
  
    const result = document.querySelectorAll('#show_result li');
    console.log(D);
    console.log(x_res, y_res, z_res);
  
    if (!isNaN(x_res) && !isNaN(y_res) && !isNaN(z_res)) {
      result[0].innerHTML = `X: ${x_res.toFixed(5)}`;
      result[1].innerHTML = `Y: ${y_res.toFixed(5)}`;
      result[2].innerHTML = `Z: ${z_res.toFixed(5)}`;
    } else {
      alert("The system of equations has no unique solution (Result is NaN or Infinity).");
    }
    show3d_graph(x,y,z,c,x_res,y_res,z_res)
  }
  
  function evaluate_for_two_eqn(){
    const x_values = document.querySelectorAll('.x_values_eqn2');
    const y_values = document.querySelectorAll('.y_values_eqn2');
    const c_values = document.querySelectorAll('.eqn_values_c_eqn2');
    const isValidInput = Array.from(x_values).every(el => !isNaN(parseFloat(el.value)));
    if (!isValidInput) {
      alert("Invalid input. Please enter numerical values.");
      return;
    }

    let x = [];
    let y = [];
    let c = [];
    
    for (let i = 0; i < x_values.length; i++) {
      x.push(parseFloat(x_values[i].value));
      y.push(parseFloat(y_values[i].value));
      c.push(parseFloat(c_values[i].value));
    }
  const D=(x[0]*y[1])-(x[1]*y[0])

  const x_res=((c[0]*y[1])-[c[1]*y[0]])/D
  const y_res=((x[0]*c[1])-(x[1]*c[0]))/D

  const result = document.querySelectorAll('#show_result li');
    console.log(D);
    console.log(x_res, y_res);
  
    if (!isNaN(x_res) && !isNaN(y_res)) {
      result[0].innerHTML = `X: ${x_res.toFixed(5)}`;
      result[1].innerHTML = `Y: ${y_res.toFixed(5)}`;
      result[2].innerHTML = ``;
    } else {
      alert("The system of equations has no unique solution (Result is NaN or Infinity).");
    }
  show2d_graph(x,y,c,x_res,y_res)
  }
  

  

  function show2d_graph(x, y, c, x_res, y_res) {
   
    const x_line = [-10, 10];

    const y_line1 = x_line.map((x_val) => (c[0] - x[0] * x_val) / y[0]);
    const y_line2 = x_line.map((x_val) => (c[1] - x[1] * x_val) / y[1]);

    const trace1 = {
        x: x_line,
        y: y_line1,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Equation 1',
    };

    const trace2 = {
        x: x_line,
        y: y_line2,
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Equation 2',
    };

    const trace3 = {
      x: [x_res],
      y: [y_res],
      type: 'scatter',
      mode: 'markers+text',
      marker: {
          color: 'red',
          size: 10,
      },
      name: 'Solution',
      text: `(${x_res.toFixed(2)}, ${y_res.toFixed(2)})`,
      textposition: 'bottom center',
  };

    const layout = {
        title: '2D Graph',
        width: 700,
        height: 600,
        margin: { l: 120, r: 50, t: 50, b: 50 },
        xaxis: {
            title: 'X-axis',
        },
        yaxis: {
            title: 'Y-axis',
            titlefont: {
                size: 14,
            },
        },
        legend: {
            x: 1.05,
            y: 1.2,
        },
        
    };

    const data = [trace1, trace2, trace3];

    Plotly.newPlot('myPlot', data, layout);
}


function show3d_graph(x1,y1,z1,c,x_r,y_r,z_r){
    const myPlot=document.getElementById('myPlot')
    const data = [{
        type: 'scatter3d',
        mode: 'markers',
        x: [],
        y: [],
        z: [],
        marker: {
          size: 2,
          color: 'rgb(75, 100, 192)',
        },
        name: 'eqn 1',
      }];
    
      for (let x = -10; x <= 10; x += .2) {
        for (let y = -10; y <= 10; y += .2) {
          const z = (c[0] - x1[0] * x - y1[0] * y) / z1[0];
          data[0].x.push(x);
          data[0].y.push(y);
          data[0].z.push(z);
        }
      }
    
     
      const data1 = [{
          type: 'scatter3d',
          mode: 'markers',
          x: [],
          y: [],
          z: [],
          marker: {
            size: 2,
            color: 'rgb(75, 192, 100)',
          },
          name: 'eqn 2',
        }];
    
        for (let x = -10; x <= 10; x += .2) {
          for (let y = -10; y <= 10; y += .2) {
            const z = (c[1] - x1[1] * x - y1[1] * y) / z1[1];
            data1[0].x.push(x);
            data1[0].y.push(y);
            data1[0].z.push(z);
          }
        }
        
        const data2 = [{
          type: 'scatter3d',
          mode: 'markers',
          x: [],
          y: [],
          z: [],
          marker: {
            size: 2,
            color: 'rgb(192, 100, 125)',
          },
          name: 'eqn 3',
        }];
    
        for (let x = -10; x <= 10; x += .2) {
          for (let y = -10; y <= 10; y += .2) {
            const z = (c[2] - x1[2] * x - y1[2] * y) / z1[2];
            data2[0].x.push(x);
            data2[0].y.push(y);
            data2[0].z.push(z);
          }
        }
       
        const pointTrace = [{
            type: 'scatter3d',
            mode: 'markers',
            x: [x_r],
            y: [y_r],
            z: [z_r],
            marker: {
              size: 10,
              color: 'rgb(255, 0, 0)',
              symbol: 'dot',
            },
            name: 'Soln',
          }];
      const layout = {
        scene: {
          aspectratio: { x: 1, y: 1, z: 1 },
          camera: { eye: { x: 2.25, y: 2.25, z: 2.25 } },
          aspectmode: "cube",
          xaxis: { title: "X-axis" },
          yaxis: { title: "Y-axis" },
          zaxis: { title: "Z-axis" },
        },
        margin: {
          l: 0, r: 0, b: 0, t: 0 
        }
      };
    
        const combinedData = [...data, ...data1, ...data2, ...pointTrace];
    
    
      Plotly.newPlot('myPlot', combinedData, layout);

}


