
//Types
interface User {
  id: number;
  avatar: string;
  fullName: string;
  email: string;
  phone: string;
  status: 'active' | 'paused' | 'disabled';
  role: 'Freelancer' | 'Employer';
}

interface Record {

}

//Convert
const statusColor = {
  ACTIVE: 'green',
  DISABLED: 'red'
};

const statusLabel = {
  ACTIVE: 'Hoạt động',
  DISABLED: 'Bị vô hiệu hóa'
};

export { statusColor, statusLabel };
export type { User };