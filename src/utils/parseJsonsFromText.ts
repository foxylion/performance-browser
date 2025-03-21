// copied from https://stackoverflow.com/a/54608716
export const parseJsonsFromText = (text: string) => {
  const chunks = [];
  let last_json_end_index = -1;
  let json_index = text.indexOf('{', last_json_end_index + 1);
  for (; json_index !== -1; json_index = text.indexOf('{', last_json_end_index + 1)) {
    // Push the plain string before the JSON
    if (json_index !== last_json_end_index + 1) chunks.push(text.substring(last_json_end_index, json_index));

    let json_end_index = text.indexOf('}', json_index + 1);

    // Find the end of the JSON
    while (true) {
      try {
        JSON.parse(text.substring(json_index, json_end_index + 1));
        break;
      } catch {
        json_end_index = text.indexOf('}', json_end_index + 1);
        if (json_end_index === -1) throw new Error('Unterminated JSON object in string');
      }
    }

    // Push JSON
    chunks.push(text.substring(json_index, json_end_index + 1));
    last_json_end_index = json_end_index + 1;
  }

  // Push final plain string if any
  if (last_json_end_index === -1) chunks.push(text);
  else if (text.length !== last_json_end_index) chunks.push(text.substring(last_json_end_index));

  return chunks;
};
