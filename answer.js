const factories = [
    { name: "BR1", employees: ["John", "Alice", "Bob", "Jessie", "Karen"] },
    { name: "BR2", employees: ["Jessie", "Karen", "John"] },
    { name: "BR3", employees: ["Miles", "Eric", "Henry", "Bob"] },
    { name: "BR4", employees: [] }
];

let countEmployeesNumberByFactory = []

const employeesNumberByFactory = () => {
    for(let data of factories){
        countEmployeesNumberByFactory.push({
            name:data.name,
            count:data.employees.length,
        });
    }
    console.log('1. Count Employees Number by Factory');
    console.log(countEmployeesNumberByFactory);
}

const FactoriesNumberByEmployee = () => {
    let employees = [];
    let countEmployeesNumberByFactory = [];
    // 篩選出全部 employees 名稱且不重複
    for(employeeData of factories){
        for (let i = 0; i < employeeData.employees.length; i++) {
            employees.push(employeeData.employees[i])
          }
    }
    employees = [...new Set(employees)];
    // 尋找每個員工的factorie
    for(let i = 0; i<employees.length; i++ ){
        let count = 0;
        for(employeeData of factories){
           if( employeeData.employees.indexOf(employees[i]) > -1){
                count+=1;
           }
        }
        countEmployeesNumberByFactory.push({
            employees:employees[i],
            count:count,
        })

    }
    console.log('2. Count Factories Number by Employee');
    console.log(countEmployeesNumberByFactory);
 
}

const orderEmployeesListByAlphabeticalOrder = () => {
    for(let data of factories){
        data.employees.sort((a,b) => a.localeCompare(b));
    }

    console.log('3. Order employees list by alphabetical order');
    console.log(factories);

}

employeesNumberByFactory();
console.log();
FactoriesNumberByEmployee();
console.log();
orderEmployeesListByAlphabeticalOrder();
console.log();


const employeeType = [
    {id: 1, "name": "FullTime", work_begin: "09:00:00", work_end: "17:00:00"},
    {id: 2, "name": "MidTime", work_begin: "12:00:00", work_end: "21:00:00"},
    {id: 3, "name": "HalfTime", work_begin: "20:00:00", work_end: "00:00:00"},
];

const employees = [
    {id: 1, name: "Alice", type: 2}, 
    {id: 2, name: "Bob", type: 3}, 
    {id: 3, name: "John", type: 2},
    {id: 4, name: "Karen", type: 1},
    {id: 5, name: "Miles", type: 3},
    {id: 6, name: "Henry", type: 1}
];

const tasks = [
    {id: 1, title: "task01", duration: 60},
    {id: 2, title: "task02", duration: 120},
    {id: 3, title: "task03", duration: 180},
    {id: 4, title: "task04", duration: 360},
    {id: 5, title: "task05", duration: 30},
    {id: 6, title: "task06", duration: 220},
    {id: 7, title: "task07", duration: 640},
    {id: 8, title: "task08", duration: 250},
    {id: 9, title: "task09", duration: 119},
    {id: 10, title: "task10", duration: 560},
    {id: 11, title: "task11", duration: 340},
    {id: 12, title: "task12", duration: 45},
    {id: 13, title: "task13", duration: 86},
    {id: 14, title: "task14", duration: 480},
    {id: 15, title: "task15", duration: 900}
];


const countTotalHoursWorked = () => {
    let totalTime = 0;
    for(employee of employees){
        for(type of employeeType){
            if(employee.type == type.id){
                totalTime+=timeCalculation(type.work_begin,type.work_end)
                break;
            }
        }
    }
    
    return totalTime;
}

const timeCalculation = (startTime, endTime) => {
    let _startTime = startTime.split(":");
    let _endTime = endTime.split(":");
    _endTime[0] = _endTime[0] == "00" ? '24': _endTime[0];
    let startDate = new Date(0,0,0,_startTime[0],_startTime[1],_startTime[2]);
    let endDate = new Date(0,0,0,_endTime[0],_endTime[1],_endTime[2]);
    let diff = endDate.getTime() - startDate.getTime();
    let hours = Math.floor(diff/1000/60/60);
    return hours
}   
console.log('4. Count total hours worked in 1 day => ', countTotalHoursWorked());

console.log();


const howManyEmployeeByTime = (time) => {
    const workingEmployees = employees.filter(employee => {
        const employeeTypeData = employeeType.find(type => type.id === employee.type);
        const workBegin = employeeTypeData.work_begin;
        const workEnd = employeeTypeData.work_end;
        if (workBegin <= time && time <= workEnd) {
          return true;
        }
        return false;
      });
      
      return workingEmployees.length;
}

console.log('5. Make a function that take as parameters dayTime and return number of employee working');
console.log("   13:00:00 => ",howManyEmployeeByTime("13:00:00")); 
console.log("   19:00:00 => ",howManyEmployeeByTime("19:00:00")); 
console.log();

const daysOfWorkNeededToDoneAllTasks = () => {
    let oneDayTime = timeCalculation("09:00:00", "00:00:00");
    let totalTaskTime = 0;
    let remainder = 0;
    for (task of tasks){
        totalTaskTime += task.duration
    }
    let totalDay = (totalTaskTime/60) / oneDayTime;
    remainder = (totalTaskTime/60)%oneDayTime
    
    totalDay = remainder == 0 ? totalDay : totalDay+1;
    totalDay = Math.ceil(totalDay);

    return totalDay;
}
console.log("6. How many days of work needed to done all tasks =>", daysOfWorkNeededToDoneAllTasks());
