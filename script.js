var firstName_text;
var lastName_text;
var dob_text;
var gender_text;
var avgMark_text;
var query_text;
var studentList_text;

var numStudent = 0;
var student = [];
var clearList = false;

onload = function(){
    firstName_text = document.getElementById("first-name");
    lastName_text = document.getElementById("last-name");
    dob_text = document.getElementById("dob");
    gender_text = document.getElementById("gender");
    avgMark_text = document.getElementById("avg-mark");
    query_text = document.getElementById("query");
    studentList_text = document.getElementById("student-list");
}

class Student {
    constructor(fName, lName, dob, gender, avgMark, num){
        this.firstName = fName;
        this.lastName = lName;
        this.dob = dob;
        this.gender = gender;
        this.avgMark = avgMark;
        this.num = num;
    }
}

function addStudent(){
    
    if(clearList){
        printStudents();
        clearList = false;
    }
    
    numStudent++;
    student.push(new Student());
    student[numStudent-1].firstName = firstName_text.value.trim();
    student[numStudent-1].lastName = lastName_text.value.toUpperCase().trim();
    student[numStudent-1].dob = dob_text.value.trim();
    student[numStudent-1].gender = gender_text.value.trim();
    student[numStudent-1].avgMark = avgMark_text.value.trim();
    student[numStudent-1].num = numStudent;

    studentList_text.value += `${numStudent}: ${student[numStudent-1].firstName} ${student[numStudent-1].lastName} ${student[numStudent-1].dob} ${student[numStudent-1].gender} ${student[numStudent-1].avgMark}`;
    studentList_text.value += "\n";
    
    firstName_text.value = "";
    lastName_text.value = "";
    dob_text.value = "";
    gender_text.value = "";
    avgMark_text.value = "";
}
function findStudent(){
    let query = query_text.value.toUpperCase().trim();
    let foundStudent;
    let found = false;
    for(let i = 0; i < student.length; i++){
        if(query == student[i].lastName){
            foundStudent = student[i];
            found = true;
            break;
        }
    }   
    if(found){
        studentList_text.value = `${foundStudent.num}: ${foundStudent.firstName} ${foundStudent.lastName} ${foundStudent.dob} ${foundStudent.gender} ${foundStudent.avgMark}`;
    }else{
        studentList_text.value = `No student found with last-name: ${query}`
    }
    query_text.value = "";
    clearList = true;
}
function printStudents(){
    studentList_text.value = "";
    for(let i = 0; i < student.length; i++){
        studentList_text.value += `${student[i].num}: ${student[i].firstName} ${student[i].lastName} ${student[i].dob} ${student[i].gender} ${student[i].avgMark}`;
        studentList_text.value += "\n";
    }
}