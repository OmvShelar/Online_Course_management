const Module = require('../model/modulemodel');

async function addModule(req, res) {
    console.log("req.body getModule****", req.body);
    try {
        const module = new Module(req.body);

        const result = await module.save();
        res 
            .status(200)
            .send({ message: "Module added Successfully", task: result });
    } catch (error) {
        res.status(500).send(error);
    }
}  
async function getModule(req, res) {
    console.log("**------**")
    try {
        result = await Module.find();
        console.log(result);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

// function for delete Module
async function deleteModule(req, res) {
    console.log(req.params.id);
    ID = req.params.id;
    try {
        const module = await Module.findByIdAndDelete(req.params.id);
        if (!module) {
            res.status(400).send({ message: "Module Not Found" });
        }
        res.send({ task: module, message: "Module Deleted" })
    } catch (error) {
        res.status(500).send(error);
    }
}


async function updateModule(req, res) {
    console.log("Module req.params.id=", req.params.id);
    console.log("Module req.body", req.body);


    try {
        const module = await Module.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!module) {
            res.status(400).send({ message: "Module no found" });
        }
        res.status(200).send({ message: "Module updated", task: module });
    } catch (error) {
        res.status(500).send(error);
    }
}

async function assign(req, res) {
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

module.exports = {
    addModule,
    getModule,
    deleteModule,
    updateModule
}