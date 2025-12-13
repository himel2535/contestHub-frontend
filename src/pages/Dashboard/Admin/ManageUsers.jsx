// src/pages/Dashboard/Admin/ManageUsers.jsx

import { useQuery } from '@tanstack/react-query';
import UserDataRow from '../../../components/Dashboard/TableRows/UserDataRow'
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import ErrorPage from '../../../components/Shared/ErrorPage/ErrorPage';
import { FaUsersCog } from 'react-icons/fa'; 

const ManageUsers = () => {

    const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: users = [],
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const result = await axiosSecure(`/users`);
      return result.data;
    },
  });

  if (isPending) return <LoadingSpinner />;

  if (isError) return <ErrorPage />;
  
  return (
    <div className='container mx-auto px-4 sm:px-8 pt-8'>
      
      {/* 1. Primary Heading */}
      <div 
        className="w-full mb-4 text-center" 
        data-aos="fade-down"
        data-aos-duration="800"
      >
        <div className="inline-flex flex-col md:flex-row md:items-center border-b-4 border-yellow-500 pb-2">
            
            <FaUsersCog className="mx-auto md:mr-3 text-yellow-600 text-4xl mb-2 md:mb-0" />
            
            <h2 className="text-4xl font-extrabold text-gray-900">
                Manage All Users ({users.length})
            </h2>
        </div>
      </div>

      <p 
        className="text-center text-gray-600 mb-10 max-w-3xl mx-auto text-lg font-medium"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        As an Admin, you have full control over user roles. Use this panel to update privileges 
        (Participant, Creator, Admin) and ensure a balanced and secure platform ecosystem.
      </p>


      {/* Table Container */}
      <div className='pb-8 '>
        <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
          <div 
            className='inline-block min-w-full shadow-2xl rounded-xl overflow-hidden border border-gray-100'
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <table className='min-w-full leading-normal divide-y divide-gray-200'>
              <thead>
                <tr className='bg-yellow-500'>
                  <th
                    scope="col"
                    className="px-5 py-3 border-b border-yellow-400 text-white text-center text-xs uppercase font-semibold tracking-wider"
                  >
                    Image
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 border-b border-yellow-400 text-white text-left text-xs uppercase font-semibold tracking-wider'
                  >
                    Name
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 border-b border-yellow-400 text-white text-left text-xs uppercase font-semibold tracking-wider'
                  >
                    Email
                  </th>
                  <th
                    scope='col'
                    className='px-5 py-3 border-b border-yellow-400 text-white text-left text-xs uppercase font-semibold tracking-wider'
                  >
                    Role
                  </th>


                  <th
                    scope='col'
                    className='px-5 py-3 border-b border-yellow-400 text-white text-center text-xs uppercase font-semibold tracking-wider'
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-100'>
                {
                  users.map((user, index) => (
                    <UserDataRow 
                      key={user?._id} 
                      user={user} 
                      refetch={refetch} 
                      delay={index * 50} 
                    />
                  ))
                }
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageUsers