/* 
Promise传入的第一个参数是一个函数
*/
console.clear()
class _Promise {
  state = "pending";

  result: any;

  constructor(executor) {
    executor(this.reject, this.reject);
  }

  initValue (){
  }

  resolve(value) {
    this.state = "fulfilled";
    this.result = value;
  }

  reject(reason) {
    // this.state = "rejected";
    // this.result = reason;
  }
}

const p1 = new _Promise((resolve, reject) => {
  reject("成功");
});

console.log("👴2022-02-21 12:01:43 index.ts line:29", p1);

export default _Promise;
