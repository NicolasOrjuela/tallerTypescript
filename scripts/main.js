import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';
var coursesTbody = document.getElementById('courses');
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var btnfilterByCredits = document.getElementById("button-filterByCredits");
var minCreds = document.getElementById("minCreds");
var maxCreds = document.getElementById("maxCreds");
var totalCreditElm = document.getElementById("total-credits");
var nameElm = document.getElementById("name");
var codeElm = document.getElementById("code");
var idElm = document.getElementById("id");
var ageElm = document.getElementById("age");
var addressElm = document.getElementById("address");
var telephoneElm = document.getElementById("telephone");
nameElm.innerHTML = dataStudent.name;
codeElm.innerHTML = dataStudent.code;
idElm.innerHTML = dataStudent.id;
ageElm.innerHTML = dataStudent.age + " a\u00F1os";
addressElm.innerHTML = dataStudent.address;
telephoneElm.innerHTML = dataStudent.telephone;
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCredits.onclick = function () { return applyFilterByCredits(); };
renderCoursesInTable(dataCourses);
totalCreditElm.innerHTML = "Total cr\u00E9ditos: " + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
function applyFilterByCredits() {
    var min = parseInt(minCreds.value);
    var max = parseInt(maxCreds.value);
    min = (isNaN(min)) ? 0 : min;
    max = (isNaN(max)) ? Infinity : max;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByCredits(min, max, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByCredits(minCreds, maxCreds, courses) {
    return courses.filter(function (c) { return c.credits >= minCreds && c.credits <= maxCreds; });
}
