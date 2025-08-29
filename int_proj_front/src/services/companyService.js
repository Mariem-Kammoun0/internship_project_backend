import { apiClient } from "./axiosInstance";

//employers 
export const createCompany = async(CompanyData)=>{
    try{
        const res= apiClient.post('/employer/company',CompanyData);
        return (await res).data;   
    }catch(error){
        console.error("failed to create company", error);
        throw error;
    }
};
export const deleteCompany = async () => {
    try{
        const res = await apiClient.delete(`/employer/company`);
        return res.data;
    }catch(e){
        console.error("failed to delete company",e);
        throw e;
    }
}
export const updateCompany = (payload) => apiClient.put(`/employer/company`, payload);
export const showMyCompany = () => apiClient.get(`/employer/my-company`);

//public
export const showcompanies=(payload) =>apiClient.get(`/companies`, payload);