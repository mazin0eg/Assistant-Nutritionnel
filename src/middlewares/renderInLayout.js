const allowedViews = new Set([
  'index',
  'meals/meal-analyse',
  'meals/mon-historique',
  'meals/meal-recommandation',
  'meals/meal-details',
  
]);

function toLayoutRelativePath(viewName) {
  return viewName.startsWith('../') ? viewName : `../${viewName}`;
}

export function renderInLayout(res, viewName, props = {}) {
  if (!allowedViews.has(viewName)) {
    return res.status(404).send('Page non trouvée');
  }
  const content = toLayoutRelativePath(viewName);
  return res.render('layouts/main.ejs', { content, ...props });
}