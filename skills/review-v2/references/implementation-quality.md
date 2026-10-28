# Implementation Quality

Use these dimensions to investigate the actual change. They are questions for engineering judgment, not a checklist of mandatory findings or prescribed refactorings.

## Review Principles and Calibration

- Optimize for risk reduction, comprehensibility, and affordable maintenance, not theoretical perfection.
- Rank findings by concrete consequence. A security finding is not automatically critical; a test or maintainability finding can be consequential.
- A smell is a hypothesis. Demonstrate what becomes harder, what can drift, or what fails before recommending a change.
- Prefer the smallest complete remedy. Deletion, inlining, and leaving similar code separate can be better than abstraction.
- Judge current requirements and realistic operating conditions. Do not demand extension points, configuration, layers, or dependencies for imagined future needs.
- Consider existing constraints and governing conventions. Unfamiliar code is not necessarily poor code, and a familiar pattern is not necessarily appropriate.

Function length, parameter count, mock count, duplication percentage, or a DRY/SOLID label alone does not justify a finding. Nor does lack of a test automatically justify adding one without identifying meaningful unprotected behavior.

## Correctness and Reliability

Trace behavior through relevant entry points and callers:

- Are assumptions and invariants preserved across normal, empty, malformed, and boundary inputs?
- Are state transitions, ordering guarantees, and side effects correct, including partial failures?
- Do errors propagate appropriately without hiding failures or discarding useful context? Are retries bounded, safe, and compatible with idempotency?
- Can concurrent operations race, observe inconsistent state, or lose updates? Are cancellation and timeouts handled where the surrounding contract requires them?
- Are resources acquired and released correctly on success, failure, and early exit?
- Are interfaces, serialization, schemas, and migrations compatible with existing callers and stored data?
- Can deployment or migration expose incompatible intermediate states, and are irreversible operations protected?

Ground findings in a reachable path and observable consequence. Do not require handling impossible states already excluded by a reliable parser, type, or upstream contract; verify that exclusion before relying on it.

## Security and Trust Boundaries

Identify inputs, identities, privileges, and sensitive outputs before applying vulnerability labels:

- Are authentication, authorization, tenant isolation, and ownership checked at the responsible boundary?
- Can untrusted values reach queries, shells, templates, file paths, network destinations, or deserializers unsafely?
- Can secrets or sensitive information leak through logs, errors, responses, caches, or inappropriate persistence?
- Are defaults, permissions, credential handling, and cryptographic choices appropriate to the threat model?
- Can an attacker cause unbounded work, bypass limits, exploit a check/use race, or abuse a fallback path?

Explain the attacker's necessary access, the reachable path, and the impact. Distinguish an exploitable issue from a defense-in-depth suggestion. Do not weaken trust-boundary parsing or error handling merely to shorten code.

## Performance and Resource Use

Relate concerns to plausible data sizes, invocation frequency, and resource budgets:

- Is repeated I/O, an N+1 query, serialization, or allocation significant in this path?
- Is work or memory unbounded under realistic inputs? Are pagination, indexing, backpressure, and limits appropriate?
- Does blocking work, lock scope, or contention reduce throughput or responsiveness?
- Do handles, connections, tasks, or caches grow without appropriate cleanup or bounds?

Inspect the actual algorithm and available measurements. Explain relevant scale assumptions when measurements are unavailable. Do not recommend caching, concurrency, or complex optimization without a credible cost; include invalidation and synchronization costs when evaluating a remedy.

## Maintainability and Simplicity

### Understandability

Can a reader follow the behavior, state, and failure paths without reconstructing hidden assumptions? Investigate misleading names, tangled control flow, implicit temporal coupling, and non-local invariants. Recommend a clearer expression of the actual concept, not arbitrary shortening or comments that repeat the code.

### Responsibility, Cohesion, and Coupling

Does the change belong at this layer? Does one unit combine unrelated responsibilities, or does one behavior require scattered coordinated edits? Trace real dependencies before proposing ownership moves. A local edit to add behavior is not evidence that polymorphism or an extension mechanism is needed.

### Duplicated Knowledge

Distinguish two cases:

- The same business rule or invariant has multiple owners and can diverge: demonstrate the shared meaning and drift risk.
- Similar-looking code serves different concepts or evolves independently: extraction may create harmful coupling.

Before recommending consolidation, identify the actual shared contract and compare the cost of maintaining the copies with the cost of the abstraction. Repeated syntax alone is insufficient.

### Unnecessary Machinery

Look for wrappers that add no meaningful boundary, configurable behavior with no caller, redundant conversions, speculative interfaces, and fallback paths unsupported by a real requirement. Determine whether a layer serves a current security, lifecycle, compatibility, or ownership purpose before recommending removal.

### Removal Opportunities

Identify obsolete implementations, unreachable paths, unused exports, and temporary scaffolding left behind by the change. Check relevant consumers, dynamic loading, external compatibility, and migration/deployment states before calling code safe to delete. Limit recommendations to the reviewed scope unless an adjacent issue is necessary to understand it.

For every maintainability finding, explain the concrete cost and the smallest useful remedy. Do not turn a small concern into a framework, broad rewrite, or unrelated cleanup.

## Test Value and Maintenance Cost

For new and affected tests, ask:

> What plausible regression would this test catch?
>
> What legitimate refactor would unnecessarily break it?

### Meaningful Protection

- Do assertions distinguish the intended behavior from a plausible incorrect implementation?
- Are changed requirements and important failure paths exercised at an appropriate boundary?
- Could a test pass because the relevant code never ran, the fixture bypassed the condition, or the assertion is vacuous?
- Are mocks controlling external dependencies, or merely repeating the implementation and asserting its choreography?
- Are integration, contract, migration, or end-to-end checks present where unit tests cannot protect the relevant boundary?

Test observable contracts. Interaction assertions are useful when the interaction itself is the contract, such as a required audit event or preventing a duplicate external write; they are not inherently wrong.

### Brittleness and Complexity

Investigate tests coupled to private structure, incidental call order, exact non-contractual wording, or large snapshots that obscure the behavior. Check whether fixtures and helpers clarify intent or introduce hidden setup, branching, shared state, and costly debugging. Assess flakiness, nondeterminism, environmental dependence, and execution cost where relevant.

Do not demand eliminating all mocks, snapshots, helpers, or setup. Show the specific brittleness or weak signal and a simpler alternative that preserves valuable protection.

### Redundancy and Overtesting

Compare what tests protect, not just their names or inputs. Multiple tests are not redundant merely because they execute the same lines. Unit and integration coverage can protect different failure modes; boundary cases can expose distinct errors.

A deletion or consolidation recommendation should identify the duplicated protection and why the remaining tests retain the relevant signal. Watch for exhaustive permutations without distinct risk, trivial tests of language/framework behavior, and repeated assertions that add maintenance cost without meaningful detection value.

Conversely, do not remove apparently repetitive tests when they establish a distinct contract, boundary, or regression. Avoid coverage-percentage targets and fixed test-count rules. The goal is enough reliable protection at reasonable cost, not maximal tests or minimal tests.

## Standards and Local Conventions

Apply governing repository rules and cite the actual rule when reporting a violation. Distinguish explicit requirements from nearby patterns, language best practices, and personal preference. A heuristic cannot override a documented convention, but conventions do not excuse a demonstrated correctness or security defect.

Leave ordinary formatting and mechanically enforced rules to project tooling unless the tooling is missing, misconfigured, or the issue has a consequence beyond formatting. For documentation, focus on contracts, public usage, and non-obvious constraints rather than requiring narration of self-evident code.
