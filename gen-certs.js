import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const certDir = path.join(__dirname, 'public', 'Certificates');
const outputFilePath = path.join(__dirname, 'src', 'data', 'certificates.json');

const categories = [];

const cleanName = (name) => {
    return name.replace(/\.pdf$/, '').replace(/_/g, ' ').replace(/-/g, ' ').trim();
};

if (fs.existsSync(certDir)) {
    const folders = fs.readdirSync(certDir, { withFileTypes: true });

    for (const folder of folders) {
        if (folder.isDirectory() && !folder.name.startsWith('.')) {
            const folderPath = path.join(certDir, folder.name);
            const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.pdf'));

            if (files.length > 0) {
                const category = {
                    title: folder.name,
                    icon: folder.name === 'Resumes' ? 'FileText' : 'Award',
                    items: files.map(f => {
                        let platform = folder.name.replace(' Certificates', '').replace(' Internship', '');
                        if (folder.name === 'Resumes') platform = 'PDF';
                        
                        return {
                            name: cleanName(f),
                            platform: platform,
                            date: '2024',
                            file: `/Certificates/${folder.name}/${f}`
                        };
                    })
                };
                categories.push(category);
            }
        }
    }
}

const dir = path.dirname(outputFilePath);
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(outputFilePath, JSON.stringify(categories, null, 2));
console.log('Successfully generated certificates.json');
