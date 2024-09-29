import StudiesAutocomplete from '@/features/common/StudiesAutocomplete/StudiesAutocomplete.component';
import UnitsAutocomplete from '@/features/common/UnitsAutocomplete/UnitsAutocomplete.component';
import UniversitiesAutocomplete from '@/features/common/UniversitiesAutocomplete/UniversitiesAutocomplete.component';

const MainPageFilters = () => {
  

  return (
    <div className="mt-10">
      
          <div className="flex justify-items-start flex-row gap-5">
            {/* <div className="col-span-1 "> */}
              <UniversitiesAutocomplete fieldName="institutionId" />
            {/* </div> */}

            {/* <div className="col-span-1"> */}
              <UnitsAutocomplete institutionFieldName="institutionId" unitFieldName="unitId" />
            {/* </div> */}

            {/* <div className="col-span-1"> */}
              <StudiesAutocomplete studyFieldName="studyId" unitFieldName="unitId" />
            {/* </div> */}
          </div>
        
    </div>
  );
};

export default MainPageFilters;
