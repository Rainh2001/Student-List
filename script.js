var firstName_text;
var lastName_text;
var avgMark_text;

var day_select;
var month_select;
var year_select;
var gender_select;

var query_text;
var studentList_table;
var remove_btn;
var edit_btn;
var required_span;
var notFound_span;
var row_table = [];
var data_table = [];

var numStudent = 0;
var student = [];
var selectedStudent;

onload = function(){
    firstName_text = document.getElementById("first-name");
    lastName_text = document.getElementById("last-name");
    day_select = document.getElementById("day");
    month_select = document.getElementById("month");
    year_select = document.getElementById("year");
    gender_select = document.getElementById("gender");
    avgMark_text = document.getElementById("avg-mark");
    query_text = document.getElementById("query");
    studentList_table = document.getElementById("student-list");
    remove_btn = document.getElementById("remove");
    edit_btn = document.getElementById("edit");
    required_span = document.getElementById("required");
    notFound_span = document.getElementById("not-found");
    
    setup();
}

function setup(){
    let dayOption = [];
    for(let i = 1; i <=31; i++){
        dayOption[i-1] = document.createElement("option");
        if(i < 10){
            dayOption[i-1].text = "0" + i;
            dayOption[i-1].value = "0" + i;
        } else {
            dayOption[i-1].text = i;
            dayOption[i-1].value = i;
        }
        day_select.add(dayOption[i-1]);
    }
    dayOption = [];
    let monthOption = [];
    for(let i = 1; i <= 12; i++){
        monthOption[i-1] = document.createElement("option");
        if(i < 10){
            monthOption[i-1].text = "0" + i;
            monthOption[i-1].value = "0" + i;
        } else {
            monthOption[i-1].text = i;
            monthOption[i-1].value = i;
        }
        month_select.add(monthOption[i-1]);
    }
    monthOption = [];
    let yearOption = [];
    for(let i = 0; i <= 3; i++){
        yearOption[i] = document.createElement("option");
        yearOption[i].value = 2000 + i;
        yearOption[i].text = 2000 + i;
        year_select.add(yearOption[i]);
    }
    yearOption = [];
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
    
    let info = [
        firstName_text.value,
        lastName_text.value,
        avgMark_text.value,
        day_select.value,
        month_select.value,
        year_select.value,
        gender_select.value
    ];
    
    let allEntered = true;
    for(let i = 0; i < info.length; i++){
        if(info[i] == ""){
            allEntered = false;
        }
    }
    avgMark_text.style.border = null;
    let invalid = false;
    if(avgMark_text.value < 0 || avgMark_text.value > 100){
        avgMark_text.value = "";
        avgMark_text.style.border = "1px solid red";
        invalid = true;
    }
    
    if(allEntered && !(invalid)){
        disableButtons();
        selectedStudent = "";
        numStudent++;
        student.push(new Student());
        
        let firstName = firstName_text.value.toLowerCase().trim();
        firstName = firstName.charAt(0).toUpperCase() + firstName.substr(1);
        
        let dob = `${day_select.value}/${month_select.value}/${year_select.value}`;
        
        let val = numStudent-1;
        
        student[val].num = numStudent;
        student[val].firstName = firstName;
        student[val].lastName = lastName_text.value.toUpperCase().trim();
        student[val].avgMark = avgMark_text.value.trim();
        student[val].dob = dob;
        student[val].gender = gender_select.value;

        row_table.push(document.createElement("tr"));
        studentList_table.appendChild(row_table[val]);
        
        data_table.push([]);
        for(let i = 0; i < 6; i++){
            data_table[val].push(document.createElement("td"));
            row_table[val].appendChild(data_table[val][i]);
        }
        
        data_table[val][0].innerHTML = student[val].num;
        data_table[val][1].innerHTML = student[val].firstName;
        data_table[val][2].innerHTML = student[val].lastName;
        data_table[val][3].innerHTML = student[val].avgMark;
        data_table[val][4].innerHTML = student[val].dob;
        data_table[val][5].innerHTML = student[val].gender;
        
        clearText();
        required_span.style.visibility = "hidden";
    }else{
        if(!allEntered){
            required_span.style.visibility = "visible";
        }
    }
}

function selectStudent(){
    let query = query_text.value.toUpperCase().trim();
    if(query != ""){
        let found = false;
        for(let i = 0; i < student.length; i++){
            if(query == student[i].lastName){
                selectedStudent = student[i];
                found = true;
                break;
            }
        }   
        if(found){
            showSelectedStudent();
            enableButtons();
            notFound_span.style.visibility = "hidden";
        }else{
            notFound_span.style.visibility = "visible";
        }
        query_text.value = "";
    }
}

function showSelectedStudent(){
    data_table[0][0].innerHTML = selectedStudent.num;
    data_table[0][1].innerHTML = selectedStudent.firstName;
    data_table[0][2].innerHTML = selectedStudent.lastName;
    data_table[0][3].innerHTML = selectedStudent.avgMark;
    data_table[0][4].innerHTML = selectedStudent.dob;
    data_table[0][5].innerHTML = selectedStudent.gender;
    
    for(let i = 1; i < student.length; i++){
        row_table[i].style.visibility = "hidden";
    }
}

function removeStudent(){
    studentList_table.removeChild(row_table[selectedStudent.num-1]);
    row_table.splice(selectedStudent.num-1, 1);
    data_table.splice(selectedStudent.num-1, 1);
    for(let i = selectedStudent.num; i < student.length; i++){
        student[i].num--;
    }
    student.splice(selectedStudent.num-1, 1);
    numStudent--;
    printStudents();
    disableButtons();
    selectedStudent = "";
}

function editStudent(){
    required_span.style.visibility = "hidden";
    if(firstName_text.value != ""){
        let firstName = firstName_text.value.toLowerCase().trim();
        firstName = firstName.charAt(0).toUpperCase() + firstName.substr(1);
        selectedStudent.firstName = firstName.trim;
    }
    if(lastName_text.value != ""){
        selectedStudent.lastName = lastName_text.value.toUpperCase();
    }
    if(avgMark_text.value != ""){
        selectedStudent.avgMark = avgMark_text.value;
    }
   
    if(day_select.value != "" || month_select.value != "" || year_select.value != ""){
        let day = selectedStudent.dob.substr(0, 2);
        let month = selectedStudent.dob.substr(3, 2);
        let year = selectedStudent.dob.substr(6, 4);
        if(day_select.value != ""){
            day = day_select.value;
        }
        if(month_select.value != ""){
            month = month_select.value;
        }
        if(year_select.value != ""){
            year = year_select.value;
        }
        selectedStudent.dob = `${day}/${month}/${year}`;
    }

    if(gender_select.value != ""){
        selectedStudent.gender = gender_select.value;
    }
    clearText();
    showSelectedStudent();
}

function printStudents(){
    required_span.style.visibility = "hidden";
    disableButtons();
    for(let i = 0; i < student.length; i++){
        row_table[i].style.visibility = "visible";
        data_table[i][0].innerHTML = student[i].num;
        data_table[i][1].innerHTML = student[i].firstName;
        data_table[i][2].innerHTML = student[i].lastName;
        data_table[i][3].innerHTML = student[i].avgMark;
        data_table[i][4].innerHTML = student[i].dob;
        data_table[i][5].innerHTML = student[i].gender;
    }
}

function enableButtons(){
    remove_btn.disabled = false;
    edit_btn.disabled = false;
}

function disableButtons(){
    remove_btn.disabled = true;
    edit_btn.disabled = true;
}

function clearText(){
    firstName_text.value = "";
    lastName_text.value = "";
    avgMark_text.value = "";
    
    day_select.selectedIndex = 0;
    month_select.selectedIndex = 0;
    year_select.selectedIndex = 0;
    gender_select.selectedIndex = 0;
    
}
