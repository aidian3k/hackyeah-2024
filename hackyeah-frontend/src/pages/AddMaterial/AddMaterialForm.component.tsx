import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface AddMaterialFormProps {}

const AddMaterialForm: React.FC<AddMaterialFormProps> = () => {
  const [title, setTitle] = useState('');
  const [universityId, setUniversityId] = useState('');
  const [facultyId, setFacultyId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<FileList | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('universityId', universityId);
    formData.append('facultyId', facultyId);
    formData.append('courseId', courseId);
    formData.append('subjectName', subjectName);
    formData.append('description', description);

    if (files) {
      Array.from(files).forEach(file => {
        formData.append('filesList', file);
      });
    }

    try {
      // request TODO
    } catch (error) {
      console.error('Error creating resource:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Dodaj nowy materiał</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Tytuł materiału</Label>
          <Input id="title" type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Wprowadź tytuł" required />
        </div>

        <div>
          <Label htmlFor="universityId">Szkoła Wyższa</Label>
          <Input
            id="universityId"
            type="text"
            value={universityId}
            onChange={e => setUniversityId(e.target.value)}
            placeholder="Wprowadź szkołę wyższą"
            required
          />
        </div>

        <div>
          <Label htmlFor="facultyId">Wydział</Label>
          <Input
            id="facultyId"
            type="text"
            value={facultyId}
            onChange={e => setFacultyId(e.target.value)}
            placeholder="Wprowadź wydział"
            required
          />
        </div>

        <div>
          <Label htmlFor="courseId">Kierunek</Label>
          <Input
            id="courseId"
            type="text"
            value={courseId}
            onChange={e => setCourseId(e.target.value)}
            placeholder="Wprowadź kierunek"
            required
          />
        </div>

        <div>
          <Label htmlFor="subjectName">Przedmiot</Label>
          <Input
            id="subjectName"
            type="text"
            value={subjectName}
            onChange={e => setSubjectName(e.target.value)}
            placeholder="Wprowadź przedmiot"
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Opis</Label>
          <Textarea
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Wprowadź opis"
            required
          />
        </div>

        <div>
          <Label htmlFor="files">Załącz materiały</Label>
          <Input id="files" type="file" onChange={handleFileChange} multiple accept=".pdf,.doc,.docx,.ppt,.pptx" />
        </div>

        <div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Tworzenie...' : 'Utwórz'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddMaterialForm;
