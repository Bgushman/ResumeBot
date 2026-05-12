"""Integration test for the health-check endpoint."""


def test_health_returns_ok(raw_client):
    resp = raw_client.get("/api/health")
    assert resp.status_code == 200
    assert resp.json() == {"status": "ok"}
