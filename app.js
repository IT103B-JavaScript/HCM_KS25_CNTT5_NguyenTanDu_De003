let students = [
    { studentCode: "STU-001", fullName: "Đặng Gia Huy", courseName: "Tiếng Anh Giao Tiếp", age: 19, placementScore: 65 },
    { studentCode: "STU-002", fullName: "Phan Ngọc Lan", courseName: "Tiếng Anh Học Thuật", age: 24, placementScore: 72 },
    { studentCode: "STU-003", fullName: "Trương Bảo Ngọc", courseName: "Tiếng Anh Thiếu Nhi", age: 9, placementScore: 40 }
];

//Xóa khoảng trắng thừa ở hai đầu và trả về null nếu người dùng chọn cancel
function cleanInput(value) {
    if (value === null) {
        return null
    }
    return value.trim()
}


//Trả về vị trí học viên có mã code trong mảng students, -1 nếu không có
function findStudentIndex(code) {
    let location = -1
    for (let i = 0; i < students.length; i++) {
        if (code === students[i].studentCode) {
            location = i
        }
    }
    return location
}


//Trả về thông báo lỗi đầu tiên của mã học viên, hoặc "" nếu hợp lệ
function validateStudentCode(code) {
    if (code.length === 0) {
        return "Lỗi: Chưa nhập mã học viên"
    }
    if (code.length < 6) {
        return "Lỗi: Độ dài nhỏ hơn 6 ký tự"
    }
    if (!code.startsWith("STU-")) {
        return `Lỗi: Sai tiền tố "STU-"`
    }
    if (code.includes(" ")) {
        return "Lỗi: Chứa khoảng trắng"
    }
    if (findStudentIndex(code) !== -1) {
        return "Lỗi: Mã học viên đã tồn tại"
    }
    return ""
}


//Trả về chuỗi đã bỏ khoảng trắng thừa và viết hoa chữ cái đầu mỗi từ
function normalizeText(rawText) {
    let words = rawText.trim().split(/\s+/)
    let result = ""
    for (let i = 0; i < words.length; i++) {
        let word = words[i]
        if (word.length === 0) {
            continue
        }
        let fixedWord = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        if (result.length === 0) {
            result = fixedWord
        } else {
            result = result + " " + fixedWord
        }
    }
    return result
}


//Nhập chuỗi không rỗng và chuẩn hóa, nhập lại khi rỗng, trả về null nếu Cancel
function inputText(message, errorMessage) {
    while (true) {
        let text = cleanInput(prompt(message))
        if (text === null) {
            return null
        }
        if (text.length === 0) {
            console.log(errorMessage)
        } else {
            return normalizeText(text)
        }
    }
}


//Trả về số nguyên trong [min, max], nhập lại khi sai, trả về null nếu Cancel
function inputIntegerInRange(message, min, max) {
    while (true) {
        let text = cleanInput(prompt(message))
        if (text === null) {
            return null
        }
        if (text.length === 0) {
            console.log("Lỗi: chưa nhập, nhập lại")
        } else if (!/^-?\d+$/.test(text)) {
            console.log("Lỗi: không phải số nguyên, nhập lại")
        } else {
            let number = Number(text)
            if (number < min || number > max) {
                console.log(`Lỗi: ngoài phạm vi ${min} – ${max}, nhập lại`)
            } else {
                return number
            }
        }
    }
}


//In thông tin một học viên (2 dòng) theo số thứ tự
function printStudentInfo(student, order) {
    console.log(order + ". " + student.studentCode + " - " + student.fullName + " - " + student.courseName)
    console.log("   Tuổi: " + student.age + " | Điểm đầu vào: " + student.placementScore)
}


//In danh sách học viên được truyền vào
function displayStudents(list) {
    if (list.length === 0) {
        console.log("Danh sách học viên trống")
        return
    }
    for (let i = 0; i < list.length; i++) {
        printStudentInfo(list[i], i + 1)
    }
    console.log(`Tổng: ${list.length} học viên`)
}


//Case 1: Hiển thị danh sách học viên theo thứ tự hiện tại
function showStudentList() {
    displayStudents(students)
}


//Case 2: Thêm học viên mới, Cancel ở bất kỳ bước nào thì hủy thao tác
function addStudent() {
    let rawCode = cleanInput(prompt("Nhập mã học viên: "))
    if (rawCode === null) {
        console.log("Hủy thao tác thêm")
        return
    }
    let studentCode = rawCode.toUpperCase()
    let codeError = validateStudentCode(studentCode)
    if (codeError !== "") {
        console.log(codeError)
        return
    }

    let fullName = inputText("Nhập họ tên học viên: ", "Lỗi: Họ tên không được để trống")
    if (fullName === null) {
        console.log("Hủy thao tác thêm")
        return
    }

    let courseName = inputText("Nhập tên khóa học: ", "Lỗi: Tên khóa học không được để trống")
    if (courseName === null) {
        console.log("Hủy thao tác thêm")
        return
    }

    let age = inputIntegerInRange("Nhập tuổi (6 - 60): ", 6, 60)
    if (age === null) {
        console.log("Hủy thao tác thêm")
        return
    }

    let placementScore = inputIntegerInRange("Nhập điểm đầu vào (0 - 100): ", 0, 100)
    if (placementScore === null) {
        console.log("Hủy thao tác thêm")
        return
    }

    let student = { studentCode, fullName, courseName, age, placementScore }
    students.push(student)
    console.log("Thêm học viên thành công:")
    printStudentInfo(student, students.length)
}


//Case 3: Cập nhật tuổi và điểm đầu vào, Cancel thì giữ nguyên giá trị cũ
function updateStudent() {
    let rawCode = cleanInput(prompt("Nhập mã học viên cần cập nhật: "))
    if (rawCode === null) {
        console.log("Hủy thao tác cập nhật")
        return
    }
    let studentCode = rawCode.toUpperCase()
    let index = findStudentIndex(studentCode)
    if (index === -1) {
        console.log(`Không tìm thấy học viên có mã ${studentCode}`)
        return
    }

    let student = students[index]
    let newAge = inputIntegerInRange("Nhập tuổi mới (6 - 60): ", 6, 60)
    if (newAge === null) {
        console.log("Bấm Cancel – đã hủy cập nhật")
        return
    }
    let newScore = inputIntegerInRange("Nhập điểm đầu vào mới (0 - 100): ", 0, 100)
    if (newScore === null) {
        console.log("Bấm Cancel – đã hủy cập nhật")
        return
    }

    console.log(`Trước: Tuổi: ${student.age} | Điểm đầu vào: ${student.placementScore}`)
    student.age = newAge
    student.placementScore = newScore
    console.log(`Sau: Tuổi: ${student.age} | Điểm đầu vào: ${student.placementScore}`)
    console.log("Cập nhật thành công")
}


//Case 4: Xóa học viên, chỉ xóa khi xác nhận "Y" hoặc "y"
// function deleteStudent() {
//     let rawCode = cleanInput(prompt("Nhập mã học viên cần xóa: "))
//     if (rawCode === null) {
//         console.log("Đã hủy thao tác xóa")
//         return
//     }



//Hiển thị menu chương trình
function showMenu() {
    let menu = `
==================================================
 HỆ THỐNG QUẢN LÝ HỌC VIÊN TRUNG TÂM GLOBAL ENGLISH
==================================================
1. Hiển thị danh sách học viên
2. Thêm học viên mới
3. Cập nhật thông tin học viên
4. Xóa học viên
5. Tìm kiếm học viên theo khóa học
0. Thoát chương trình
==================================================
`
    console.log(menu)
}


//Chạy menu lặp lại cho đến khi chọn 0
function runProgram() {
    let isRunning = true
    while (isRunning) {
        showMenu()
        let choice = cleanInput(prompt("Vui lòng nhập lựa chọn của bạn (0 - 5): "))
        switch (choice) {
            case "1":
                showStudentList()
                break;
            case "2":
                addStudent()
                break;
            case "3":
                updateStudent()
                break;
            case "4":
                break;
            case "5":
                break;
            case "0":
                console.log("Cảm ơn đã sử dụng hệ thống! Kết thúc chương trình!")
                isRunning = false
                break;
            default:
                console.log("Lựa chọn không hợp lệ! Vui lòng chọn số từ 0-5!")
                break;
        }
    }
}

runProgram()