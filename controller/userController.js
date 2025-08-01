import User from "../model/userModel.js"


export const create = async (req, res) => {
    try {
        const newUser = new User(req.body);

        const { email } = newUser;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "User already exists." });

        }

        const savedData = await newUser.save();
        //res.status(200).json(savedData);
        res.status(200).json({ message: "User created successfully." });

    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
};

export const getAllUsers = async (req, res) => {
    try {
        console.log("getAllUsers called 1");
        const userData = await User.find();
        console.log("getAllUsers called 2");

        if (!userData || userData.length === 0) {
            return res.status(404).json({ message: "User data not found." });
        }
        res.status(200).json(userData);

    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
};

export const getUserByid = async (req, res) => {
    try {
        const id = req.params.id;

        const userExists = await User.findById(id);

        if (!userExists) {
            return res.status(404).json({ message: "User not found." });
        }
        res.status(200).json(userExists);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {

        const id = req.params.id;

        const userExists = await User.findById(id);

        if (!userExists) {
            return res.status(404).json({ message: "User not found." });
        }
        const newUserProfile = await User.findByIdAndUpdate(id, req.body, {
            new: true
        });
        //res.status(200).json(newUserProfile);
        res.status(200).json({ message: "User updated successfully." });


    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}


export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;

        const userExists = await User.findById(id);

        if (!userExists) {
            return res.status(404).json({ message: "User not found." });

        }
        await User.findByIdAndDelete(id);

        res.status(200).json({ message: "User deleted successfully" });

    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
}