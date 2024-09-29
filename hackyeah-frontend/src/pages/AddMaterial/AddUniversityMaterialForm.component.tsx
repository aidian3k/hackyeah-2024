import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import UniversitiesAutocomplete from "@/features/common/UniversitiesAutocomplete/UniversitiesAutocomplete.component";
import UnitsAutocomplete from "@/features/common/UnitsAutocomplete/UnitsAutocomplete.component";
import StudiesAutocomplete from "@/features/common/StudiesAutocomplete/StudiesAutocomplete.component";
import { useUploadLearningResource } from "@/api/mutation/uploadLearningResourceMutation";
import { PostLearningResourceDTO } from "@/ts/interface/LearningResource";

interface AddUniversityMaterialFormProps {}

const AddUniversityMaterialForm: React.FC<AddUniversityMaterialFormProps> = () => {
  const formMethods = useForm<PostLearningResourceDTO>();
  const { mutate: uploadResource, isError, isSuccess, isPending } = useUploadLearningResource();

  const onSubmit = async (data: PostLearningResourceDTO) => {
    uploadResource(data);
  };

  useEffect(() => {
    if (isSuccess) {
      alert("Materiał został dodany");
      formMethods.reset();
    }
  }, [isError, isSuccess]);

  return (
    <div className="max-w-lg mx-auto bg-background p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Nowy materiał - Szkoła Wyższa</h2>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="title">Tytuł materiału</Label>
            <Input
              id="title"
              type="text"
              {...formMethods.register("learningResourceCreationDTO.title", { required: true })}
              placeholder="Wprowadź tytuł"
              required
            />
          </div>

          <div>
            <Label htmlFor="institutionId">Szkoła Wyższa</Label>
            <UniversitiesAutocomplete fieldName={"learningResourceCreationDTO.institutionId"} />
          </div>

          <div>
            <Label htmlFor="unitId">Wydział</Label>
            <div className="w-full">
              <UnitsAutocomplete institutionFieldName={"learningResourceCreationDTO.institutionId"} unitFieldName={"learningResourceCreationDTO.unitId"} />
            </div>
          </div>

          <div>
            <Label htmlFor="courseId">Kierunek</Label>
            <div className="w-full">
              <StudiesAutocomplete unitFieldName={"learningResourceCreationDTO.unitId"} studyFieldName={"learningResourceCreationDTO.courseId"}  />
            </div>
          </div>

          <div>
            <Label htmlFor="subjectName">Przedmiot</Label>
            <Input
              id="subjectName"
              type="text"
              {...formMethods.register("learningResourceCreationDTO.subjectName", { required: true })}
              placeholder="Wprowadź przedmiot"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Opis</Label>
            <Textarea
              id="description"
              {...formMethods.register("learningResourceCreationDTO.description", { required: true })}
              placeholder="Wprowadź opis"
              required
            />
          </div>

          <div>
            <Label htmlFor="files">Załącz materiały</Label>
            <Input
              id="files"
              type="file"
              {...formMethods.register("filesList")}
              onChange={(e) => {
                if (e.target.files) {
                  formMethods.register("filesList").onChange(e);
                }
              }}
              multiple
              accept=".pdf,.doc,.docx,.ppt,.pptx"
            />
          </div>

          <div>
            <Button type="submit">
              {isPending ? "Tworzenie..." : "Utwórz"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddUniversityMaterialForm;
