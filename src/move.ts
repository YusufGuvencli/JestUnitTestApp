// Please update this type as same as with the data shape.
type List = {
  id: string;
  name: string;
  files: {
    id: string;
    name: string;
  }[];
}[];

export default function move(list: List, source: string, destination: string): List {
  // Check destination is a folder
  const isDestinationAFolder = list.some((x) => x.id === destination);
  if (!isDestinationAFolder) throw new Error('You cannot specify a file as the destination');

  // Get folder id by source id
  const sourceFolder = list.filter((f) => f.files.find((s) => s.id === source))[0];
  if (!sourceFolder) throw new Error('You cannot move a folder');

  // Get file by source id
  const file = sourceFolder.files.filter((x) => x.id === source)[0];

  // Remove file from source
  sourceFolder.files.splice(sourceFolder.files.indexOf(file), 1);

  // Add file to destination
  const destinationFolder = list.filter((x) => x.id === destination)[0];
  destinationFolder.files.push(file);

  list[list.indexOf(sourceFolder)] = sourceFolder;
  list[list.indexOf(destinationFolder)] = destinationFolder;
  return list;
}
