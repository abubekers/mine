const Company = require("../models/companyModel");
const User = require("../models/userModel");
const Category = require("../models/categoryModel");
const uploadFile = require("../middleware/upload");
const fs = require("fs");
// Display All company info Data
const LIMIT = 10;
company_index = async (req, res) => {
    try {
        const { page = 1 } = req.query;

        const companyData = await Company.find().limit(LIMIT).skip((page - 1) * LIMIT).sort({
            createdAt: -1,
        })
        return res.status(200).send({"companyData":companyData,
        "currenPage" : Number(page)});
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
};

// Create New company
company_create= async (req, res) => {
    try {
        const companydata = req.body;
        const email = companydata.email;

        if (Object.keys(companydata).length == 0) {
            return res.status(400).send({ message: "Data Is not Provided" });
		}
        const emailExist = await Company.findOne({ email });

        if (emailExist) {
            res.status(400).send({ "message": "Email All ready Exists Try again" });
            return;
        }
        //for file upload
        await uploadFile(req, res);
    
        if (req.file == undefined) {
          return res.status(400).send({ message: "Please upload a file!" });
        }
        const newCompany= await Company.create({
            companyName:companydata.companyName,
			phone:companydata.phone,
			email:companydata.email,
			location:companydata.location,
			link:companydata.link,
			description:companydata.description,
            user_id:companydata.user_id,
            category_id:companydata.category_id,
            file:companydata.file,
        });
        newCompany.save()
        res
            .status(200)
            .send({newCompany, message: "Company Created Succesfully !" });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ message: error.message });
        
    }
     
};
//get company data for category
getdataForCategory = async (req, res) => {
    try {

        const companyData = await Company.find({category_id:req.Category.id}).sort({
            createdAt: -1,
        })
        return res.status(200).send(companyData);
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
};
//get company data for creator
getdataForCreator = async (req, res) => {
    try {

        const companyData = await Company.findById(req.params.user);

        return res.status(200).send(companyData);
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
};
//get single  company data
getsinglecompanydata = async (req, res) => {
    try {
        const companyData = await Company.findById(req.params.id)
        if (cruddata == null) {
            return res.status(404).send({ message: "Requested Data not found" });
        }

        return res.status(200).send(companyData);
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
};

// Update company Detail by Id
company_update = async (req, res) => {
    try {
        const companyInfo = req.body;
        const companyid = req.params.id;
        if (!companyid) {
            return res.status(400).send({ message: "Company Id Is not Found" });
        }
        if (Object.keys(companyInfo).length == 0) {
            return res.status(400).send({ message: "company Data Is not Provided" });
        }

        const updatedcompany = await  Company.findOneAndUpdate({
            companyName:companyInfo.companyName,
			phone:companyInfo.phone,
			email:companyInfo.email,
			location:companyInfo.location,
			link:companyInfo.link,
			description:companyInfo.description,
            user_id:companyInfo.user_id,
            category_id:companyInfo.category_id,
            file:companydata.file,
            });
            
            updatedcompany.save()
            res
            .status(200)
            .send({ updatedcompany, message: "Selected Data Updated Succesfully !" });
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
};
// Delete company Detail by Id
company_delete = async (req, res) => {
    try {
        const companyToDelete = await Company.findById(req.params.id);

        if(companyToDelete == null){
            return res.status(404).send({ message: "Company data Not found" });
        }
        const deletedcompany = await Company.deleteOne({_id:req.params.id});

        return res
            .status(202)
            .send({ deletedcompany, message: "Selected Company Data Deleted Succesfully !" });
    } catch (error) {
        return res.status(404).send({ message: error.message });
    }
};

module.exports = {
	company_index,
	company_create,
	company_update,
	company_delete,
	getdataForCreator,
	getsinglecompanydata,
    getdataForCategory,
};
