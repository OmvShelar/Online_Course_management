const Course = require('../model/coursemodel');

async function addCourse(req, res) {
    console.log("req.body getapplication****", req.body);
    try {
        const course = new Course(req.body);

        const result = await course.save();
        res
            .status(200)
            .send({ message: "Course added Successfully", task: result });
    } catch (error) {
        res.status(500).send(error);
    }
}
async function getcourse(req, res) {
    console.log("**------**")
    try {
        result = await Course.find();
        console.log(result);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

// function for delete user
async function deletecourse(req, res) {
    console.log(req.params.id);
    ID = req.params.id;
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) {
            res.status(400).send({ message: "Course Not Found" });
        }
        res.send({ task: user, message: "Course Deleted" })
    } catch (error) {
        res.status(500).send(error);
    }
}


async function updatecourse(req, res) {
    console.log("Course req.params.id=", req.params.id);
    console.log("Course req.body", req.body);


    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!course) {
            res.status(400).send({ message: "Course no found" });
        }
        res.status(200).send({ message: "Course updated", task: course });
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

async function assignModule(req, res) {
    try {
        const userid = req.params.id;
        const user = await User.findOne({ _id: userid });

        if (!user) {
            return res.status(404).send({ message: "Unknown userId" });
        }

        const module = await Module.findById(req.body.moduleId);
        if (!module) {
            return res.status(404).send({ message: "Unknown moduleId" });
        }

        const modules = [req.body.moduleId];

        user.modules = modules;

        const updatedUser = await user.save();
        return res.status(200).send(updatedUser);

    } catch (error) {
        return res.status(500).send(error);
    }
}

async function getAssignedModules(req, res) {
    try {
        const userid = req.params.id;
        const user = await User.findOne({ _id: userid }).populate('modules');

        if (!user) {
            return res.status(404).send({ message: "Unknown userId" });
        }

        if (!user.modules || user.modules.length === 0) {
            return res.status(404).send({ message: "No modules assigned to this user" });
        }

        return res.status(200).send(user.modules);

    } catch (error) {
        return res.status(500).send(error);
    }
}

async function deleteUserModule(req, res) {
    const userId = req.params.id;
    const moduleId = req.body.moduleId;
    try {
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(404).send({ message: "Unknown userId" });
        }

        user.modules = user.modules.filter(m => m != moduleId);

        const updatedUser = await user.save();
        return res.status(200).send(updatedUser);

    } catch (error) {
        return res.status(500).send(error);
    }
}

async function updateModule(req, res) {
    const userId = req.params.id;
    const moduleId = req.body.moduleId;
    const newModuleId = req.body.newModuleId;
    try {
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(404).send({ message: "Unknown userId" });
        }

        const moduleIndex = user.modules.indexOf(moduleId);
        if (moduleIndex === -1) {
            return res.status(404).send({ message: "Module not found for the user" });
        }

        user.modules[moduleIndex] = newModuleId;

        const updatedUser = await user.save();
        return res.status(200).send({ message: "Module updated", updatedUser });

    } catch (error) {
        return res.status(500).send(error);
    }
}

module.exports = {
    addCourse,
    getcourse,
    deletecourse,
    updatecourse,
    assignModule,
    deleteUserModule,
    getAssignedModules,
    updateModule
}