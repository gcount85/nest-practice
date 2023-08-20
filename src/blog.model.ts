export interface PostDto {
  id: string;
  title: string;
  content: string;
  name: string;
  createdDt?: Date; // nullable
  updatedDt?: Date; // nullable
}
