const express = require("express")
const {get_data, post_data, update_data, delete_data, get_img, create_img, edit_img, delete_img} = require("./crud")
const { get_emp, post_emp, update_emp, delete_emp, getEmp_img, createEmp_img, editEmp_img, deleteEmp_img, getEdit_emp, getid_img } = require("./employee_crud")
const multer = require("multer")
const { get_customer, post_customer, delete_customer } = require("./Createcuscrud")
const { get_attend, post_attend, update_attend, delete_attend } = require("./Attendnce_crud")
const { get_login, post_login, update_login, delete_login, userDetail, get_username, get_email, validUser } = require("./login_crud")

const router = express.Router()


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./fb_connection/src/component/images");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
    });
    const upload = multer({ storage: storage });


// student
router.get("/get", get_data)
router.post("/create", post_data)
router.put("/update/:id", update_data)
router.delete("/delete/:id", delete_data)
router.get("/getimg", get_img)
router.post("/createimg", upload.single("images") ,create_img)
router.put("/editimg/:id", upload.single("images") ,edit_img)
router.delete("/delimg/:id" ,delete_img)

// employee
router.get("/empget", get_emp)
router.get("/empeditget/:id", getEdit_emp)
router.post("/empcreate", post_emp)
router.put("/empedit/:id", update_emp)
router.delete("/empdelete/:id", delete_emp)
router.get("/getempimg", getEmp_img)
router.get("/getempimgs/:id", getid_img)
router.post("/createempimg", upload.single("imagesemp") ,post_emp)
router.put("/editempimg/:id", upload.single("imagesemp") ,editEmp_img)
router.delete("/delempimg/:id" ,deleteEmp_img)

// createcustomer
router.get("/crtcustomer", get_customer)
router.post("/postcus", post_customer)
router.delete("/delcustomer/:id", delete_customer)


// Attendance
router.get("/getattend", get_attend)
router.post("/postattend", post_attend)
router.put("/updateattend/:id", update_attend)
router.delete("/delattend/:id", delete_attend)

// login
router.get("/getlogin",validUser, get_login)
router.get("/checkusername", get_username)
router.get("/checkemail", get_email)
router.post("/createlogin", post_login)
router.put("/editlogin/:id", update_login)
router.delete("/logindel/:id", delete_login)
router.post("/userdetails", userDetail)

module.exports = router