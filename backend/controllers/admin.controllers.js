import LoanApplication from "../models/LoanApplication.js";

// Controller to get all loan applications
export const getAllApplications = async (req, res) => {
    try {
        const applications = await LoanApplication.find();
        res.json({ applications });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching applications" });
    }
};

// Controller to update loan application status
export const updateApplicationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { applicationStatus } = req.body; // Status should be one of 'Pending', 'Approved', 'Rejected'

        // Validate status
        if (!['Pending', 'Approved', 'Rejected'].includes(applicationStatus)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const application = await LoanApplication.findByIdAndUpdate(
            id,
            { applicationStatus },
            { new: true }
        );

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        res.json({ message: 'Application status updated', application });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating application status' });
    }
};

// Controller to filter applications by city or country
export const filterApplications = async (req, res) => {
    try {
        const { city, country } = req.query;

        let filterCriteria = {};
        if (city) {
            filterCriteria.city = city;
        }
        if (country) {
            filterCriteria.country = country;
        }

        const applications = await LoanApplication.find(filterCriteria);

        res.json({ applications });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error filtering applications' });
    }
};
