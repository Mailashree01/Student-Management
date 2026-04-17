const BASE_URL = "/students";

const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const handleResponse = async (response) => {
  const contentType = response.headers.get("content-type");
  let body = null;

  if (contentType && contentType.includes("application/json")) {
    body = await response.json();
  } else {
    body = await response.text();
  }

  if (!response.ok) {
    const message = body?.message || body || response.statusText || "Unknown error";
    throw new Error(`${response.status} ${message}`);
  }

  return body;
};

const requestOptions = (options = {}) => ({
  credentials: "include",
  ...options,
});

export const getAllStudents = () =>
  fetch(`${BASE_URL}/all`, requestOptions({ headers: defaultHeaders }))
    .then(handleResponse)
    .then((data) => {
      console.log("Raw API response:", data);
      if (Array.isArray(data)) return data;
      if (data.students && Array.isArray(data.students)) return data.students;
      if (data.data && Array.isArray(data.data)) return data.data;
      console.warn("Unexpected API response format:", data);
      return [];
    });

export const addStudent = (data) =>
  fetch(
    `${BASE_URL}/add`,
    requestOptions({
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify(data),
    })
  ).then(handleResponse);

export const updateStudent = (id, data) =>
  fetch(
    `${BASE_URL}/${id}`,
    requestOptions({
      method: "PUT",
      headers: defaultHeaders,
      body: JSON.stringify(data),
    })
  ).then(handleResponse);

export const deleteStudent = (id) =>
  fetch(
    `${BASE_URL}/${id}`,
    requestOptions({
      method: "DELETE",
      headers: defaultHeaders,
    })
  ).then(handleResponse);

export const getStudentById = (id) =>
  fetch(`${BASE_URL}/${id}`, requestOptions({ headers: defaultHeaders })).then(handleResponse);