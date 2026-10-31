let student = [
    {studentCode: "STU-001", fullname: "Đặng Gia Huy", courseName: "Tiếng Anh Giao Tiếp", age: 19, placementScore: 65},
    {studentCode: "STU-002", fullname: "Phan Ngọc Lan", courseName: "Tiếng Anh Học Thuật", age: 24, placementScore: 72},
    {studentCode: "STU-003", fullname: "Trương Bảo Ngọc", courseName: "Tiếng Anh Thiếu Nhi", age: 9, placementScore: 40}
];
//Xóa khoảng trắng thừa ở
function clearnInput(value){
    if (value === null){
        return null
    }
    return value.trim()
}

function showMenu(){
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

function runProgram(){
    let isRunning = true
    while(isRunning){
        showMenu()
        let choice = clearnInput(prompt("Vui lòng nhập lựa chọn của bạn (0-5): "))
        switch(choice){
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "0":
                console.log("Cảm ơn đã sử dụng hệ thống! Kết thúc chương trình!")
                isRunning=false
                break;
            default:
                console.log("Lựa chọn không hợp lệ! Vui lòng chọn số từ 0-5!")
                break;
        }

    }
}