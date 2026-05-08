const API_BASE = "http://localhost:5032";

export async function getReports(patientId) {
    try {
        if (!patientId) return [];
        
        const res = await fetch(`${API_BASE}/api/AIReports/patient/${patientId}/history`);
        
        if (!res.ok) {
            console.error("Server Error:", res.status);
            return [];
        }
        
        return await res.json();
    } catch (error) {
        console.error("Network or SSL Error:", error);
        return []; // يرجع مصفوفة فاضية بدل ما يوقف البرنامج
    }
}

export async function getReportById(reportId) {
    if (!reportId) throw new Error("الـ reportId غير موجود");
    const res = await fetch(`${API_BASE}/api/AIReports/${reportId}`);
    if (!res.ok) throw new Error("تقرير غير موجود");
    return res.json();
}