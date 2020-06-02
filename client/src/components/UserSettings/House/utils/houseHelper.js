exports.isTenantApproved = (house, tenantId) => {
  const approved = house
    ? house.approved_tenants.filter((tenant) => tenant._id === tenantId)
    : false;

  return approved.length > 0;
};
