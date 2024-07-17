
const User = require('../model/usermodel');
const Course = require('../model/coursemodel');

const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");


//Register a user

async function adduser(req, res) {
    newName = req.body.name;
    try {
        userExists = await User.findOne({ name: newName });

        if (userExists) {
            res.status(200).send({ message: "User already exists" });
        } else {
            const user = new User(req.body);
            await user.save();
            res.status(201).send({ message: "Registration Successful", task: user });
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

//Login an existing user

async function loginStudent(req, res) {
    try {
        const { name, password } = req.body;
        const user = await User.findOne({ name });
        if (!user) {
            res.status(400).send({ message: "Invalid login credentials" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send({ message: "Invalid Login Credentials" });
        }
        const token = jwt.sign({ id: user._id }, "sprouts", { expiresIn: "1d" });
        const result = {
            message: "Login successful",
            success: true,
            token: token,
            id: user._id,
            userName: user.username,
        };
        res.status(200).send(result);
    } catch (error) {
        console.error("Error Occured:", error);
        res.status(500).send({
            message: "Internal Server Error",
            error: error.message || error,
        });
    }
}

async function getusers(req, res) {
    console.log("**------**")
    try {
        result = await User.find();
        console.log(result);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

// function for delete user
async function deleteusers(req, res) {
    console.log(req.params.id);
    ID = req.params.id;
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(400).send({ message: "User Not Found" });
        }
        res.send({ task: user, message: "User Deleted" })
    } catch (error) {
        res.status(500).send(error);
    }
}


async function updateuser(req, res) {
    console.log("updateuser req.params.id=", req.params.id);
    console.log("updateuser req.body", req.body);


    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!user) {
            res.status(400).send({ message: "Application no found" });
        }
        res.status(200).send({ message: "Application updated", task: user });
    } catch (error) {
        res.status(500).send(error);
    }
}

async function assignCourse(req, res) {
    try {
        const userid = req.params.id;
        const user = await User.findOne({ _id: userid });

        if (!user) {
            res.status(404).send({ message: "Unknown userId" });
        } else {

            const course = await Course.findById(req.body.courseId);
            console.log(course);
            if (!course) {
                res.status(404).send({ message: "Unknown courseId" });
            } else {
                const courses = [req.body.courseId];

                user.course = courses;

                const updateUser = await user.save();
                if (updateUser) {
                    res.status(200).send(updateUser);
                }
            }

        }

    } catch (error) {
        res.status(500).send(error);
    }
}

async function deleteusercourse(req,res){
const userId = req.params.id;
const courseId = req.body.courseId;
try {
    const user = await User.findOne({_id: userId});
    console.log(user);

    const usercourse = user.course;

    let newlist = await usercourse.filter(c =>{
        return c != courseId;
    });

    console.log(newlist);

    user.course = newlist;
        
    const updatedUser = await user.save();
 
    res.status(200).send(updatedUser);
} catch (error) {
    res.status(500).send(error);
}
}

async function updateCourse(req,res){
const userId = req.params.id;
const courseId = req.body.courseId;
const newCourseId = req.body.newCourseId;
try {
    const user = await User.findOne({_id: userId});
    const userCourse = user.course;
    console.log(userCourse);

    let newlist = await usercourse.filter(c =>{
        return c != courseId;
    });

    console.log(newlist);

    const indexofcourse = userCourse.indexOf(courseId);
    console.log(indexofcourse);
    user.course = userCourse[indexofcourse] = newCourseId;

    const updatedUser = await user.save();
    res.status(200).send({message: "course updates",updatedUser});
} catch (error) {
    res.status(500).send(error);
}
}

module.exports ={
        adduser,
        loginStudent,
        getusers,
        deleteusers,
        updateuser,
        assignCourse,
        deleteusercourse,
        updateCourse
    }