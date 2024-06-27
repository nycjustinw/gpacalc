
document.getElementById('addRow').addEventListener('click', function() {
   //generates table
    const tableBody = document.getElementById('gradeTableBody');
    const rowCount = tableBody.rows.length;
    const newRow = tableBody.insertRow();

    newRow.innerHTML = `
        <td><input type="text" name="course" value="Course #${rowCount + 1}"></td>
        <td><input type="text" name="grade" value=""></td>
        <td><input type="number" name="credits" value=""></td>
        <td><button type="button" class="remove-row">x</button></td>
    `;

});

//removes rows
document.getElementById('gradeTableBody').addEventListener('click', async function(event) {
    if (event.target.classList.contains('remove-row')) {
        event.target.closest('tr').remove();
        /*
        if(courseId){
            try{
                await axios.post(`/grades/gpa/delete/${courseId}`);
                row.remove();
            } catch (error){
                console.error('delete course failed', error.response.data);
            }
        //ensures delete
        }else{
            row.remove();
        }*/
    }
});

//calculates GPA
document.getElementById('calculateGPA').addEventListener('click', async function() {
    const tableBody = document.getElementById('gradeTableBody');
    const grades = [];
    for (let row of tableBody.rows) {
        //references specific values in each row
        const courseName = row.cells[0].querySelector('input').value;
        const grade = row.cells[1].querySelector('input').value;
        const credits = row.cells[2].querySelector('input').value;
        //validates that courses exist, then adds to average
        
        if (grade && credits && courseName) {
            grades.push({ grade, creditHours: Number(credits) });
            
            /*
            try{
                const res = await axios.post('/grades/gpa',{
                    course: courseName,
                    grade: grade,
                    credits: credits
                });
                if(res.data && res.data._id){
                    row.setAttribute('data-course-id', res.data._id);
                } else{
                    console.error('Response data missing id');
                }
            } catch (error){
                console.error('Failed to add new course', error.response.data);
                console.log(courseName, grade, credits);
            }*/
        }
    }
    try {
        const response = await axios.post('/grades/gpa', { grades });
        document.getElementById('gpaResult').textContent = response.data.gpa;
    } catch (error) {
        console.error(error.response.data);
    }
});
