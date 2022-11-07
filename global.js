// global object

console.log(global);

// setTimeout function
setTimeout(()=>console.log('hello world'), 5000);


// clearing interval in settimeout fucntion
setTimeout(()=>{
    console.log('clearing interval \n thank you');
    clearInterval(demoInterval);
}, 6000)

const demoInterval = setInterval(() => {
    console.log('I am an interval function');
}, 1000);
