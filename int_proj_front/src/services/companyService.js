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
export const showcompanies=async ({ page = 1, search = '', filters = {} }) =>{
    try {
        const paramsObj = { page };
        if (search) paramsObj.search = search;
        
        //filter handling
         Object.entries(filters).forEach(([key, value]) => {
        if (key === 'size' && value && typeof value === 'number') {
            if (value.min !== null && value.min !== '') paramsObj.size_min = value.min;
            if (value.max !== null && value.max !== '') paramsObj.size_max = value.max;
        } else if (value !== '' && value !== null && value !== undefined) {
            paramsObj[key] = value;
        }
        });
        const params = new URLSearchParams();
        Object.entries(paramsObj).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                params.append(key, String(value));
            }});
        const queryString = params.toString();
        const res = await apiClient.get(`/companies${queryString ? `?${queryString}` : ''}`);
        return res.data;   
    }catch(e)
        {throw new Error(e);}
};

