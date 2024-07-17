const Lecture = require('../model/modulemodel');

async function addLecture(req, res) {
    console.log("req.body getLecture****", req.body);
    try {
        const lecture = new Lecture(req.body);

        const result = await lecture.save();
        res 
            .status(200)
            .send({ message: "Lecture added Successfully", task: result });
    } catch (error) {
        res.status(500).send(error);
    } 
}  
async function getLecture(req, res) {
    console.log("**------**")
    try {
        result = await Lecture.find();
        console.log(result);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

// function for delete Lecture
async function deleteLecture(req, res) {
    console.log(req.params.id);
    ID = req.params.id;
    try {
        const lecture = await Lecture.findByIdAndDelete(req.params.id);
        if (!lecture) {
            res.status(400).send({ message: "Lecture Not Found" });
        }
        res.send({ task: lecture, message: "Lecture Deleted" })
    } catch (error) {
        res.status(500).send(error);
    }
}



async function updateLecture(req, res) {
    console.log("Lecture req.params.id=", req.params.id);
    console.log("Lecture req.body", req.body);

    try {
        const lecture = await Lecture.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!lecture) {
            res.status(400).send({ message: "Lecture no found" });
        }
        res.status(200).send({ message: "Lecture updated", task: lecture });
    } catch (error) {
        res.status(500).send(error);
    }
}
module.exports = {
    addLecture,
    getLecture,
    deleteLecture,
    updateLecture
}