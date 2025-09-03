import { User, Settings, BarChart3, Briefcase, Bell, Shield, LogOut, Edit2, Mail, Phone, Calendar, MapPin, FileText, Eye, Clock, CheckCircle, XCircle } from 'lucide-react';
import React ,{ useState, useEffect } from 'react';
import { isAuthenticated } from '../../services/auth';
import { getUser, updateUser } from '../../services/userServices';
import { showMyCompany ,createCompany,updateCompany} from '../../services/companyService';
import applicationService from '../../services/ApplicationService';
import { useNavigate } from "react-router-dom";

function EmployerProfile() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [userInfo, setUserInfo] = useState(null);
    const [company, setCompany]= useState(null);
    const [jobs, setJobs]= useState([]);
    const [applications, setApplications]=useState([])
    const [error, setError]= useState(null);
    const [loading, setLoading]=useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [profileUpdate, setProfileUpdate]= useState({});
    
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchUserAndCompany = async()=>{
            try{
                setLoading(true);
                const user=await isAuthenticated();
                setUserInfo(user);
                if(!user.company_id){
                    setError("")
                }
                const companyData= await showMyCompany();
                setCompany(companyData);
                const jobsData= await CompanyJobOffers();
                setJobs(jobsData);
            }catch(e){
                setError("Erreur lors du chargement des données. Veuillez réessayer plus tard.");
                console.error("Error fetching user or company data:", e);
            }
        };
    fetchUserAndCompany();
    },[]);

    useEffect(()=>{
        const fetchApp = async()=>{
            setError(null);
            try {
                const data = await applicationService.getMyApplications();
                setJobs(data);
            } catch (err) {
                console.error("Error loading jobs:", err);
                setError("Failed to load applications. Please try again.");
            }
        };
        fetchApp();
    },[]);

    const navigationItems = [
        { id: 'dashboard', label: 'Dashboard', icon: BarChart3, color: 'bg-blue-500' },
        { id: 'job-offers', label: 'offres de jobs', icon: Briefcase, color: 'bg-green-500' },
        { id: 'profile', label: 'Profil', icon: User, color: 'bg-purple-500' },
    ];

    const stats = [
        { label: 'Candidatures envoyées', value: '23', color: 'text-blue-600' },
        { label: 'Entretiens programmés', value: '5', color: 'text-green-600' },
        { label: 'Profil consulté', value: '156', color: 'text-purple-600' },
        { label: 'Offres sauvegardées', value: '12', color: 'text-orange-600' },
    ]; 
    const getStatusBadge = (status) => {
    switch (status) {
        case "En cours":
        return "badge badge-warning"; 
        case "Entretien programmé":
        return "badge badge-info";  
        case "Accepté":
        return "badge badge-success";   
        case "Refusé":
        return "badge badge-error";
        default:
        return "badge";
    }
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = async () => {
        try{
            await updateUser(profileUpdate);
            setUserInfo((prev) => ({
                ...prev,
                ...profileUpdate
            }));
            setProfileUpdate({});
            console.log('User  info saved succeffully');
        }catch(e){
            throw('Error saving user info:', e);
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setProfileUpdate({}); 
    };
    const handleWithdraw = async (id) => {
    try {
      await applicationService.withdrawApplication(id);
      setJobs(prev => prev.filter(app => app.id !== id));
    } catch (err) {
      console.error("Error withdrawing application:", err);
    }
  };

    const renderDashboard = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4">Activité récente</h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between py-3 border-b">
                        <div className="flex items-center space-x-3">
                            <Briefcase className="w-5 h-5 text-blue-500" />
                            <div>
                                <p className="font-medium">Jobs les plus récents</p>
                                <p className="text-sm text-gray-500">Développeur React chez TechCorp</p>
                            </div>
                        </div>
                        <span className="text-sm text-gray-400">Il y a 2h</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b">
                        <div className="flex items-center space-x-3">
                            <Eye className="w-5 h-5 text-green-500" />
                            <div>
                                <p className="font-medium">Profil consulté</p>
                                <p className="text-sm text-gray-500">Par un recruteur de StartupInnovation</p>
                            </div>
                        </div>
                        <span className="text-sm text-gray-400">Il y a 5h</span>
                    </div>
                    <div className="flex items-center justify-between py-3">
                        <div className="flex items-center space-x-3">
                            <Calendar className="w-5 h-5 text-purple-500" />
                            <div>
                                <p className="font-medium">Entretien programmé</p>
                                <p className="text-sm text-gray-500">StartupInnovation - Demain 14h</p>
                            </div>
                        </div>
                        <span className="text-sm text-gray-400">Hier</span>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4">Recommandations pour vous</h3>
                <div className="space-y-3">
                    <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="font-medium text-blue-600">Senior Frontend Developer</h4>
                                <p className="text-sm text-gray-600">TechStartup Paris • 55-65k€ • CDI</p>
                                <p className="text-sm text-gray-500 mt-1">React, TypeScript, Node.js</p>
                            </div>
                            <button className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                                Postuler
                            </button>
                        </div>
                    </div>
                    <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="font-medium text-blue-600">Développeur Full Stack</h4>
                                <p className="text-sm text-gray-600">FinTech Lyon • 45-55k€ • CDI</p>
                                <p className="text-sm text-gray-500 mt-1">Vue.js, Python, Docker</p>
                            </div>
                            <button className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                                Postuler
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderJobs = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Jobs</h3>
                <div className="flex space-x-2">
                    <select className="select select-bordered">
                        <option>Tous les statuts</option>
                        <option>En cours</option>
                        <option>Entretien programmé</option>
                        <option>Accepté</option>
                        <option>Refusé</option>
                    </select>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                        Rechercher des offres 
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {jobs.map((job, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                    <h4 className="font-semibold text-lg">{job_offer.title}</h4>
                                    <span >
                                        //a remplir
                                    </span>
                                </div>
                                <p className="text-gray-600 font-medium mb-2">{job_offer.company.name}</p>
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                    <div className="flex items-center space-x-1">
                                        <MapPin className="w-4 h-4" />
                                        <span>{application.job_offer.company.address}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <span>💰</span>
                                        <span>{applicationService.formatSalary(application.job_offer.salary)}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Calendar className="w-4 h-4" />
                                        <span>Postulé le: {applicationService.formatDate(application.created)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <button className="px-3 py-2 border rounded-lg hover:bg-gray-50 transition-colors text-sm" onClick={() => navigate(`/job-offers/${application.job_offer.id}`)}>
                                    Voir l'offre
                                </button>
                                <button className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
                                    Suivre
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderProfile = () => {
        if (!userInfo) {
            return <p>Chargement du profil...</p>;
        }
        return(
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex justify-between items-start mb-6">
                    <h3 className="text-lg font-semibold">Informations personnelles</h3>
                    <button 
                        onClick={handleEditToggle}
                        className="flex items-center space-x-2 px-3 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <Edit2 className="w-4 h-4" />
                        <span>{isEditing ? 'Annuler' : 'Modifier'}</span>
                    </button>
                </div>

                <div className="flex items-start space-x-6">
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-8 h-8 text-gray-400" />
                    </div>
                    <div className="flex-1 space-y-4">
                        {isEditing ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input 
                                    type="text" 
                                    value={profileUpdate.name??userInfo.name} 
                                    onChange={(e) => setProfileUpdate((prev)=>(
                                    {   ...prev,
                                        name: e.target.value
                                    }))
                                }
                                    className="border rounded-lg px-3 py-2"
                                    placeholder="Nom complet"
                                />
                                <input 
                                    type="email" 
                                    value={profileUpdate.email??userInfo.email} 
                                    onChange={(e) => setProfileUpdate((prev)=>(
                                    {   ...prev,
                                        email: e.target.value
                                    }))
                                    }
                                    className="border rounded-lg px-3 py-2"
                                    placeholder="Email"
                                />
                                <input 
                                    type="tel" 
                                    value={profileUpdate.phone??userInfo.phone} 
                                    onChange={(e) => setProfileUpdate((prev)=>(
                                    {   ...prev,
                                        phone: e.target.value
                                    }))
                                    }
                                    className="border rounded-lg px-3 py-2"
                                    placeholder="Téléphone"
                                />
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <User className="w-5 h-5 text-gray-400" />
                                        <div>
                                            <p className="text-sm text-gray-500">Nom</p>
                                            <p className="font-medium">{userInfo.name}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Mail className="w-5 h-5 text-gray-400" />
                                        <div>
                                            <p className="text-sm text-gray-500">Email</p>
                                            <p className="font-medium">{userInfo.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Phone className="w-5 h-5 text-gray-400" />
                                        <div>
                                            <p className="text-sm text-gray-500">Téléphone</p>
                                            <p className="font-medium">{userInfo.phone}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <MapPin className="w-5 h-5 text-gray-400" />
                                        <div>
                                            <p className="text-sm text-gray-500">Localisation</p>
                                            <p className="font-medium">{userInfo.location}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Briefcase className="w-5 h-5 text-gray-400" />
                                        <div>
                                            <p className="text-sm text-gray-500">Profession</p>
                                            <p className="font-medium">{userInfo.profession}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Calendar className="w-5 h-5 text-gray-400" />
                                        <div>
                                            <p className="text-sm text-gray-500">Membre depuis</p>
                                            <p className="font-medium">{userInfo.joinDate}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {isEditing && (
                            <div className="flex space-x-3 pt-4">
                                <button 
                                    onClick={handleSave}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                    Sauvegarder
                                </button>
                                <button 
                                    onClick={handleCancel}
                                    className="border px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Annuler
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4">CV et Documents</h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                            <FileText className="w-5 h-5 text-blue-500" />
                            <div>
                                <p className="font-medium">CV_Jean_Dupont.pdf</p>
                                <p className="text-sm text-gray-500">Mis à jour le 20 août 2025</p>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <button className="text-blue-500 hover:bg-blue-50 px-3 py-1 rounded">
                                Voir
                            </button>
                            <button className="text-blue-500 hover:bg-blue-50 px-3 py-1 rounded">
                                Modifier
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                            <FileText className="w-5 h-5 text-green-500" />
                            <div>
                                <p className="font-medium">Lettre_de_motivation.pdf</p>
                                <p className="text-sm text-gray-500">Mis à jour le 18 août 2025</p>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <button className="text-blue-500 hover:bg-blue-50 px-3 py-1 rounded">
                                Voir
                            </button>
                            <button className="text-blue-500 hover:bg-blue-50 px-3 py-1 rounded">
                                Modifier
                            </button>
                        </div>
                    </div>
                </div>
                <button className="mt-4 w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors">
                    + Ajouter un document
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4">Paramètres du compte</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <Bell className="w-5 h-5 text-gray-400" />
                            <div>
                                <p className="font-medium">Notifications email</p>
                                <p className="text-sm text-gray-500">Recevoir des alertes pour les nouvelles opportunités</p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <Shield className="w-5 h-5 text-gray-400" />
                            <div>
                                <p className="font-medium">Profil public</p>
                                <p className="text-sm text-gray-500">Permettre aux recruteurs de voir votre profil</p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                </div>
                <div className="mt-6 pt-4 border-t">
                    <button className="flex items-center space-x-2 text-red-600 hover:text-red-700">
                        <LogOut className="w-4 h-4" />
                        <span>Se déconnecter</span>
                    </button>
                </div>
            </div>
        </div>
    );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Mon Profil</h1>
                    <p className="text-gray-600 mt-2">Gérez vos candidatures et informations personnelles</p>
                </div>

                {/* Navigation */}
                <div className="flex space-x-1 mb-8 bg-white p-1 rounded-lg shadow-sm border">
                    {navigationItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors ${
                                    activeTab === item.id
                                        ? 'bg-blue-500 text-white shadow-sm'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                <Icon className="w-4 h-4" />
                                <span>{item.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Content */}
                <div className="space-y-6">
                    {activeTab === 'dashboard' && renderDashboard()}
                    {activeTab === 'applications' && renderApplications()}
                    {activeTab === 'profile' && renderProfile()}
                </div>
            </div>
        </div>
    );
}

export default EmployerProfile;