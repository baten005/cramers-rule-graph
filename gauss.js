function PerformOperation(a, n){
   let i = 0
   let j = 0
   let k = 0
   let c = 0
   let flag = 0

    for (let i=0; i<n; i++){
        if (a[i][i] == 0){
            c = 1
            while ((i + c) < n && a[i + c][i] == 0){
               c += 1 
            }
                
            if ((i + c) == n){
               flag = 1
                break 
            }
                

            j = i

            for (let k=0; k<n+1; k++){
               temp = a[j][k]
                a[j][k] = a[j + c][k]
                a[j + c][k] = temp 
            }
                
        }
        for (let j=0; j<n; j++){
            if (i != j){
                p = a[j][i] / a[i][i]

                k = 0
                for (let k=0; k<n+1; k++){
                    a[j][k] = a[j][k] - (a[i][k]) * p
                } 
            }
        }
    }

        

            
               
                    

    return flag
}
  


function PrintResult(a, n, flag){
    
     
}
  
       


function CheckConsistency(a, n, flag){
     flag = 3
    for(let i=0; i<n; i++){
        sum = 0
        for (let j=0; j<n; j++){
            sum = sum + a[i][j]
        if (sum == a[i][j]){
            flag = 2
        }
            
        }
            
    }
        

    return flag
}
   










function evaluate() {
    const x_values = document.querySelectorAll('.x_values');
    const y_values = document.querySelectorAll('.y_values');
    const z_values = document.querySelectorAll('.z_values');
    const c_values = document.querySelectorAll('.eqn_values_c');
    
    // Check for invalid inputs
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
  console.log(x)
  const a = new Array(3).fill(0).map(() => new Array(4).fill(0));

    for(let i=0; i<3; i++){
        for(let j=0; j<4; j++){
            if(j==0){
                a[i][j]=x[i]
            }else if(j==1){
                a[i][j]=y[i]
            }else if(j==2){
                a[i][j]=z[i]
            }else{
                a[i][j]=c[i]
            }
             
        } 
    }

n = 3
flag = 0
flag = PerformOperation(a, n)

if (flag == 1){
    flag = CheckConsistency(a, n, flag)
}

let data=[]
let x_res
let y_res
let z_res
console.log("Solution of x, y & Z are : ")

if (flag == 2){
    console.log("Infinite Solutions Exists<br>")
}   
else if(flag == 3){
    console.log("No Solution Exists<br>")
}   
else{
     for(let i=0; i<n; i++){
        console.log(a[i][n] / a[i][i])
        data.push(a[i][n] / a[i][i]);
     }
        
}
    x_res=data[0]
    y_res=data[1]
    z_res=data[2]
    const result = document.querySelectorAll('#show_result li');
    
    console.log(x_res, y_res, z_res);
  
    if (!isNaN(x_res) && !isNaN(y_res) && !isNaN(z_res)) {
      result[0].innerHTML = `x: ${x_res.toFixed(2)}`;
      result[1].innerHTML = `y: ${y_res.toFixed(2)}`;
      result[2].innerHTML = `z: ${z_res.toFixed(2)}`;
    } else {
      alert("The system of equations has no unique solution (Result is NaN or Infinity).");
    }
    graph(x,y,z,c,x_res,y_res,z_res)
  }
  
  
  document.getElementById('calculate_button').addEventListener('click', evaluate);
  



function graph(x1,y1,z1,c,x_r,y_r,z_r){
    const myPlot=document.getElementById('myPlot')
    const data = [{
        type: 'scatter3d',
        mode: 'markers',
        x: [],
        y: [],
        z: [],
        marker: {
          size: 5,
          color: 'rgb(75, 100, 192)',
        },
      }];
    
      for (let x = -10; x <= 10; x += .3) {
        for (let y = -10; y <= 10; y += .3) {
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
            size: 5,
            color: 'rgb(75, 192, 100)',
          },
        }];
    
        for (let x = -10; x <= 10; x += .3) {
          for (let y = -10; y <= 10; y += .3) {
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
            size: 5,
            color: 'rgb(192, 100, 125)',
          },
        }];
    
        for (let x = -10; x <= 10; x += .3) {
          for (let y = -10; y <= 10; y += .3) {
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
              size: 20,
              color: 'rgb(255, 0, 0)',  // Red color
              symbol: 'dot',
            },
          }];
      const layout = {
        scene: {
          aspectratio: { x: 1, y: 1, z: 1 },
          camera: { eye: { x: 2.25, y: 2.25, z: 2.25 } },
        },
        margin: {
          l: 50, r: 0, b: 0, t: 0 
        }
      };
    
        const combinedData = [...data, ...data1, ...data2, ...pointTrace];
    
    
      Plotly.newPlot('myPlot', combinedData, layout);

}
