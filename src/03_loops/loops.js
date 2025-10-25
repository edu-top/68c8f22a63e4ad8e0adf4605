for(let i = 1, j=1; i < 5, j < 4; i++, j++){
    console.log(i + j);
}
// 1 итерация: i=1, j=1; i + j = 2
// 2 итерация: i=2, j=2; i + j = 4
// 3 итерация: i=3, j=3; i + j = 6

for(let i=1; i <= 5; i++){
    for(let j = 1; j <=5; j++){
        let res = i * j;
       console.log(res);
    }
}
