# Screen Request Template

## Target

- App: (admin / web)
- Route: (e.g. `/products/:id`)
- Screen name: (e.g. `ProductDetailPage`)

## Design

- Reference: (Figma link or screenshot)
- Layout: (full-page / modal / drawer)
- Responsive: (describe mobile requirements)

## Data/API

- API required: yes / no
- API document: (path in `backend/rapid-go/docs/`)
- Mock data: (describe or attach sample data)

## States

- Loading: (describe loading UX)
- Error: (describe error UX)
- Empty: (describe empty state)
- Permission denied: (yes/no + who can see this)
- Success: (describe success state)

## Form

- Form required: yes / no
- Fields: (list each field: name, type, validation, required)
- Validation: (describe rules)
- Submit behavior: (what happens on success / failure)

## Done Criteria

- [ ] Route accessible
- [ ] All states implemented (loading/error/empty)
- [ ] Mobile layout works
- [ ] Storybook story added
- [ ] Unit test added
- [ ] E2E updated if signin/core flow changed
- [ ] `pnpm check` passes
