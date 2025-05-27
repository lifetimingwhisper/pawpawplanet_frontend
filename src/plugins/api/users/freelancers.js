import service from '@/plugins/axios.js';

const root = '/api/freelancers';

export function getFreelancerProfile(data) {
  return service({
    url: `${root}/profile`,
    method: 'get',
    data,
  });
}

export function updateFreelancerProfile(data) {
  return service({
    url: `/api/orders/baa74b00-b6e0-48d6-acad-0017f876460c/payment`,
    method: 'post',
    data,
  });
}

export function createOrUpdateService(data) {
  return service({
    url: `${root}/services`,
    method: 'post',
    data,
  });
}

export function getFreelancerServiceDetail(data) {
  return service({
    url: `${root}/services/${data}`,
    method: 'get',
    data,
  });
}
