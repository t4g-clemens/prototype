export interface HiringManagerData {
  why?: string,
  what?: string,
  withWhom?: string,
  how?: string
}

export interface JobDescription {
  id?: string,
  location?: string,
  application_deadline?: string,
  employment_type?: string,
  start_date?: string,
  education?: string,
  website?: string,
  compensation?: string,
  notes?: string,
  key?: string,

  // stages are: [ 'new', 'send_to_department', 'in_edit_by_department',
  // 'completed_by_department', 'in_edit_by_hr', 'finished' ]
  stage: string,
  hiring_manager_data?: HiringManagerData
}
