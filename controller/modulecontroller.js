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

async function assignLecture(req, res) {
    try {
        const userid = req.params.id;
        const user = await User.findOne({ _id: userid });

        if (!user) {
            return res.status(404).send({ message: "Unknown userId" });
        }

        const lecture = await Lecture.findById(req.body.lectureId);
        if (!lecture) {
            return res.status(404).send({ message: "Unknown lectureId" });
        }

        const lectures = [req.body.lectureId];

        user.lectures = lectures;

        const updatedUser = await user.save();
        return res.status(200).send(updatedUser);

    } catch (error) {
        return res.status(500).send(error);
    }
}

async function getAssignedLectures(req, res) {
    try {
        const userid = req.params.id;
        const user = await User.findOne({ _id: userid }).populate('lectures');

        if (!user) {
            return res.status(404).send({ message: "Unknown userId" });
        }

        if (!user.lectures || user.lectures.length === 0) {
            return res.status(404).send({ message: "No lectures assigned to this user" });
        }

        return res.status(200).send(user.lectures);

    } catch (error) {
        return res.status(500).send(error);
    }
}

async function deleteUserLecture(req, res) {
    const userId = req.params.id;
    const lectureId = req.body.lectureId;
    try {
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(404).send({ message: "Unknown userId" });
        }

        user.lectures = user.lectures.filter(l => l != lectureId);

        const updatedUser = await user.save();
        return res.status(200).send(updatedUser);

    } catch (error) {
        return res.status(500).send(error);
    }
}


async function updateLecture(req, res) {
    const userId = req.params.id;
    const lectureId = req.body.lectureId;
    const newLectureId = req.body.newLectureId;
    try {
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(404).send({ message: "Unknown userId" });
        }

        const lectureIndex = user.lectures.indexOf(lectureId);
        if (lectureIndex === -1) {
            return res.status(404).send({ message: "Lecture not found for the user" });
        }

        user.lectures[lectureIndex] = newLectureId;

        const updatedUser = await user.save();
        return res.status(200).send({ message: "Lecture updated", updatedUser });

    } catch (error) {
        return res.status(500).send(error);
    }
}




module.exports = {
    addModule,
    getModule,
    deleteModule,
    updateModule,
    assignLecture,
    deleteUserLecture,
    updateLecture,
    getAssignedLectures
}