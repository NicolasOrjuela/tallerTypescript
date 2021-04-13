import { Course } from './course.js';

import { dataCourses } from './dataCourses.js';

import { dataStudent } from './dataStudent.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement>document.getElementById("search-box")!;
const btnfilterByCredits: HTMLElement = document.getElementById("button-filterByCredits")!;
const minCreds: HTMLInputElement = <HTMLInputElement>document.getElementById("minCreds")!;
const maxCreds: HTMLInputElement = <HTMLInputElement>document.getElementById("maxCreds")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;

const nameElm: HTMLElement = document.getElementById("name")!;
const codeElm: HTMLElement = document.getElementById("code")!;
const idElm: HTMLElement = document.getElementById("id")!;
const ageElm: HTMLElement = document.getElementById("age")!;
const addressElm: HTMLElement = document.getElementById("address")!;
const telephoneElm: HTMLElement = document.getElementById("telephone")!;

nameElm.innerHTML = dataStudent.name;
codeElm.innerHTML = dataStudent.code;
idElm.innerHTML = dataStudent.id;
ageElm.innerHTML = `${dataStudent.age} años`;
addressElm.innerHTML = dataStudent.address;
telephoneElm.innerHTML = dataStudent.telephone;

btnfilterByName.onclick = () => applyFilterByName();
btnfilterByCredits.onclick = () => applyFilterByCredits();

renderCoursesInTable(dataCourses);

totalCreditElm.innerHTML = `Total créditos: ${getTotalCredits(dataCourses)}`

function renderCoursesInTable(courses: Course[]): void {
    console.log('Desplegando cursos');
    courses.forEach((course) => {
        let trElement = document.createElement("tr");
        trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
        coursesTbody.appendChild(trElement);
    });
}

function applyFilterByName() {
    let text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
    return nameKey === '' ? dataCourses : courses.filter(c =>
        c.name.match(nameKey));
}

function getTotalCredits(courses: Course[]): number {
    let totalCredits: number = 0;
    courses.forEach((course) => totalCredits = totalCredits + course.credits);
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
    let min = parseInt(minCreds.value);
    let max = parseInt(maxCreds.value);
    min = (isNaN(min)) ? 0 : min;
    max = (isNaN(max)) ? Infinity : max;
    clearCoursesInTable();
    let coursesFiltered: Course[] = searchCourseByCredits(min, max, dataCourses)
    renderCoursesInTable(coursesFiltered);
}

function searchCourseByCredits(minCreds: number, maxCreds: number, courses: Course[]): Course[] {
    return courses.filter(c => c.credits >= minCreds && c.credits <= maxCreds)
}
