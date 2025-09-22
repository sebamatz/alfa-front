import { createContext, useEffect, useState } from "react";
import { getbranches } from "../api/fetch";
import { IGetBranchesResponse } from "../api/types";
export interface IAppProps { }
export const defaultValues: any = {};
export const BranchesContext = createContext(defaultValues);


export const BranchesContextProvider = ({ children }) => {
    const [customer, setCustomer] = useState(null);
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [isEmployee, setIsEmployee] = useState(undefined);
    const [branches, setBranches] = useState<IGetBranchesResponse[]>([]);
  
  
    useEffect(() => {
      if (isEmployee) {
        setCustomer(null);
      }
    }, [isEmployee]);
  
    useEffect(() => {
      const handleMessage = async (event) => {
        // Optional: validate event.origin for security
        // if (event.origin !== 'https://your-parent-domain.com') return;
  
        const { userAfm }: { userAfm: string } = event.data;
          if (userAfm) {
            if(userAfm?.startsWith("7777777")){
              setIsEmployee(true);
            }
              const data = await getbranches(userAfm);
            setCustomer(data[0]);
            
        }
       
      };
  
      window.addEventListener("message", handleMessage);
  
      // Cleanup
      return () => {
        window.removeEventListener("message", handleMessage);
      };
    }, [isEmployee]);


    useEffect(() => {
        if(customer && customer.branches.length > 0){
            setSelectedBranch(customer.branches[0]);
        }
    }, [customer]);
  
  
    const stateData = {
      customer,
      setCustomer,
      isEmployee,
      setIsEmployee,
      selectedBranch,
      setSelectedBranch,
      branches,
      setBranches,
    }
  
    console.log("BranchesContext", stateData);
    return <BranchesContext.Provider value={
    stateData}>{children}</BranchesContext.Provider>
}
